import React, { useState, useRef, useEffect } from 'react';
import { useEpoch } from '../../context/EpochContext';
import { useDialectic } from '../../context/DialecticContext';
import { PHILOSOPHERS_DATA } from '../../data/philosophers';
import {
  ClinicChatMessage,
  ClinicDoctorProfile,
  ClinicPrescription
} from '../../types/philosophy';
import { handleImageFallback } from '../../data/fallbackAvatar';
import { callPhilosophicalLLM, ChatMessagePayload } from '../../utils/aiClient';
import {
  Sparkles,
  Stethoscope,
  KeyRound,
  Send,
  RotateCcw,
  Download,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  HeartPulse,
  Flame,
  FileText,
  CheckCircle2,
  ArrowLeft,
  UserCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface SyndromePreset {
  id: string;
  tag: string;
  title: string;
  category: string;
  defaultPrompt: string;
  recommendedDoctor: string;
}

const SYNDROME_PRESETS: SyndromePreset[] = [
  {
    id: 'existential-void',
    tag: '#存在虚无',
    title: '荒谬与无意义感',
    category: '存在论专科',
    defaultPrompt: '每天日复一日地做着机械重复的工作，感觉无论怎么拼搏，宇宙最终归于热寂，生命毫无根本意义，不知究竟为何而活。',
    recommendedDoctor: '阿尔贝·加缪 (荒谬哲学)'
  },
  {
    id: 'rat-race-burnout',
    tag: '#内卷失控',
    title: '评价绑架与耗竭',
    category: '斯多葛与自律专科',
    defaultPrompt: '身处同辈竞争的疯狂螺旋中，停下来就陷入强烈的落后恐慌，被外界 KPI 和社交评价彻底绑架，身心已濒临重度耗竭。',
    recommendedDoctor: '马可·奥勒留 (斯多葛主义)'
  },
  {
    id: 'worldly-ambition',
    tag: '#名利撕扯',
    title: '欲望膨胀与精神内耗',
    category: '道家逍遥专科',
    defaultPrompt: '一方面极度渴望世俗成功与财务自由，另一方面又在追名逐利中感到精神空虚与虚伪作呕，无法获得内心的从容自洽。',
    recommendedDoctor: '庄子 (齐物逍遥论)'
  },
  {
    id: 'moral-dilemma',
    tag: '#道德两难',
    title: '生存利益 vs 良心底线',
    category: '实践理性专科',
    defaultPrompt: '在现实职场利益与内心良知底线之间反复撕扯，面对不公与潜规则，不知是该顺从功利现实，还是誓死坚守绝对原则。',
    recommendedDoctor: '伊曼努尔·康德 (批判哲学)'
  },
  {
    id: 'alienated-cog',
    tag: '#工具异化',
    title: '系统螺丝钉与主体丧失',
    category: '历史唯物论专科',
    defaultPrompt: '在庞大组织机器与算法指标的压迫下，感觉自己只是随时可被替换的耗材零件，丧失了身为真正人性的创造性与生命知觉。',
    recommendedDoctor: '卡尔·马克思 (异化批判)'
  },
  {
    id: 'dogmatic-control',
    tag: '#求全偏执',
    title: '失控恐慌与确定性强迫',
    category: '认识论与解构专科',
    defaultPrompt: '对万事万物有着强迫般的确定性渴求与完美主义，哪怕出现一丝失控或偶然变数就焦虑狂躁，在未雨绸缪中过度损耗。',
    recommendedDoctor: '路德维希·维特根斯坦 (日常语言哲学)'
  }
];

export const PhilosophicalClinicView: React.FC = () => {
  const { activeEra, apiConfig, setIsApiConfigOpen, openPhilosopherById } = useEpoch();
  const { startChatWithPhilosopher } = useDialectic();

  // 从本地存储中恢复上一次未结案的问诊会话或处方
  const savedSession = React.useMemo(() => {
    try {
      const raw = localStorage.getItem('odyssey_clinic_session_v2');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  // 问诊三阶段状态机: triage(挂号分诊) -> consulting(1-on-1深入交流) -> prescribed(处方结案)
  const [stage, setStage] = useState<'triage' | 'consulting' | 'prescribed'>(
    savedSession?.stage || 'triage'
  );

  // 用户主诉
  const [userInquiry, setUserInquiry] = useState<string>(
    savedSession?.userInquiry || ''
  );
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  // 匹配出的主治医生档案
  const [doctor, setDoctor] = useState<ClinicDoctorProfile | null>(
    savedSession?.doctor || null
  );

  // 1-on-1 问诊多轮对话流
  const [chatMessages, setChatMessages] = useState<ClinicChatMessage[]>(
    savedSession?.chatMessages || []
  );
  const [draftInput, setDraftInput] = useState<string>('');
  const [isDoctorTyping, setIsDoctorTyping] = useState<boolean>(false);

  // 处方笺数据
  const [prescription, setPrescription] = useState<ClinicPrescription | null>(
    savedSession?.prescription || null
  );
  const [isGeneratingPrescription, setIsGeneratingPrescription] = useState<boolean>(false);
  const [checkedPraxis, setCheckedPraxis] = useState<Record<number, boolean>>({});

  // 交互与导出辅助
  const [isTriageLoading, setIsTriageLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const prescriptionRef = useRef<HTMLDivElement>(null);

  // 同步保存当前会话至 localStorage
  useEffect(() => {
    try {
      if (stage === 'triage' && !doctor && !prescription) {
        localStorage.removeItem('odyssey_clinic_session_v2');
      } else {
        localStorage.setItem(
          'odyssey_clinic_session_v2',
          JSON.stringify({
            stage,
            userInquiry,
            doctor,
            chatMessages,
            prescription
          })
        );
      }
    } catch (e) {
      console.error('Failed to sync clinic session:', e);
    }
  }, [stage, userInquiry, doctor, chatMessages, prescription]);

  // 问诊深度等级（根据用户回复的轮数计算）
  const userTurnsCount = chatMessages.filter((m) => m.sender === 'user').length;
  const dialecticDepth = Math.min(5, userTurnsCount + 1);

  // 滚动至最新对话
  useEffect(() => {
    if (stage === 'consulting') {
      chatScrollRef.current?.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages, isDoctorTyping, stage]);

  // 全馆哲学家摘要清单以供大模型严格检索匹配
  const validPhilosophersList = PHILOSOPHERS_DATA.map(
    (p) => `${p.id}: ${p.name.zh} [${p.schools.slice(0, 2).join('/')}] - 核心洞见: ${p.coreInsight}`
  ).join('\n');

  // 选择经典预设
  const handleSelectPreset = (preset: SyndromePreset) => {
    setSelectedPresetId(preset.id);
    setUserInquiry(preset.defaultPrompt);
    setErrorMessage(null);
  };

  // 阶段 1：发起智能分诊，匹配主治先哲并登场出诊
  const handleStartTriage = async () => {
    const trimmed = userInquiry.trim();
    if (!trimmed) {
      setErrorMessage('请先输入您目前遇到的现实困惑或生存焦虑。');
      return;
    }
    if (trimmed.length < 6) {
      setErrorMessage('请稍作详述您的困惑情境（至少6个字），以便精准匹配对症先哲。');
      return;
    }

    if (!apiConfig?.apiKey) {
      setIsApiConfigOpen(true);
      return;
    }

    setIsTriageLoading(true);
    setErrorMessage(null);

    const triageSystemPrompt = `你是由格尔德·阿申巴赫（Gerd Achenbach）创立的“哲学咨询与实践（Philosophical Practice）”的首席分诊导师。
来访者提出了现实人生困扰，你的任务是从全馆 63 位古今中外哲学家中，精准分诊出一位最对症的【主治先哲名医】来接诊，并生成这位医生出诊时的第一句开场白。

【全馆 63 位合法哲学家清单（必须且只能从中选择一个 ID，严禁捏造）】：
${validPhilosophersList}

【输出规范】：
请直接返回标准的 JSON 对象，不要包含 markdown 代码块（如 \`\`\`json）：
{
  "philosopherId": "匹配的哲学家ID（必须严格等于清单中的合法ID）",
  "doctorTitle": "契合该病症的专科称号（如：荒谬反抗与存在重构主治特聘导师、欲望悬置与自然逍遥首席专科）",
  "matchingRationale": "约60-100字：为什么由这位先哲来接诊此病症，他在哲学史上对该问题有何根本洞见",
  "greeting": "主治先哲以第一人称出诊的开场白（包含温和而深邃的问候，约50字）",
  "firstSocraticQuestion": "先哲提出的第一个直击灵魂的苏格拉底产婆术式反诘追问，直戳来访者未曾审视的认知盲区（约60-90字）"
}`;

    const triageUserPrompt = `【来访者主诉】\n“${trimmed}”\n\n请进行哲学分诊并挑选一位最对症的主治先哲出诊。`;

    try {
      const content = await callPhilosophicalLLM(
        apiConfig,
        [
          { role: 'system', content: triageSystemPrompt },
          { role: 'user', content: triageUserPrompt }
        ],
        { temperature: 0.7 }
      );

      let parsed: any;
      try {
        let clean = content.trim();
        if (clean.startsWith('```')) {
          clean = clean.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
        }
        parsed = JSON.parse(clean);
      } catch {
        const m = content.match(/\{[\s\S]*\}/);
        if (m) parsed = JSON.parse(m[0]);
        else throw new Error('分诊结果解析失败');
      }

      // 从本地 63 位哲学家库中精准对齐
      const matchedPhil =
        PHILOSOPHERS_DATA.find((p) => p.id === parsed.philosopherId) ||
        PHILOSOPHERS_DATA.find((p) => p.name.zh === parsed.philosopherName) ||
        PHILOSOPHERS_DATA.find((p) => p.id === 'camus') ||
        PHILOSOPHERS_DATA[0];

      const doctorProfile: ClinicDoctorProfile = {
        philosopherId: matchedPhil.id,
        philosopherName: matchedPhil.name.zh,
        doctorTitle: parsed.doctorTitle || '哲学咨询专科特聘导师',
        school: matchedPhil.schools[0] || '核心学派',
        avatar: matchedPhil.avatar,
        matchingRationale: parsed.matchingRationale || matchedPhil.coreInsight,
        quote: matchedPhil.famousQuotes[0]?.quote || ''
      };

      setDoctor(doctorProfile);

      // 初始化问诊室对话
      const firstMessageText = `${parsed.greeting || '我是' + matchedPhil.name.zh + '。在思想史的长河中，我也曾被类似的困惑所折磨。'}\n\n${parsed.firstSocraticQuestion || '在开始辩难前我想叩问你：你此刻感受到的痛苦，究竟是现实本身的残酷，还是你暗中赋予了现实某种不切实际的期待？'}`;

      setChatMessages([
        {
          id: `msg-doc-${Date.now()}`,
          sender: 'doctor',
          text: firstMessageText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      setStage('consulting');
    } catch (err: any) {
      console.error('Triage failed:', err);
      setErrorMessage(`分诊连接异常：${err.message || '请检查 API Key 或网络设置。'}`);
    } finally {
      setIsTriageLoading(false);
    }
  };

  // 阶段 2：在 1-on-1 问诊室中与主治医生展开多轮交谈
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || draftInput).trim();
    if (!text || isDoctorTyping || !doctor) return;

    const userMsg: ClinicChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setDraftInput('');
    setIsDoctorTyping(true);

    const docSystemPrompt = `你是由格尔德·阿申巴赫哲学实践学派特聘的哲学主治医生【${doctor.philosopherName}】（来自${doctor.school}）。
你正在哲学心灵诊所内，与来访者就他最初的困惑进行 1-on-1 深入的哲学问诊交谈。

【来访者初始主诉】：
“${userInquiry}”

【你的哲学基石与名言】：
“${doctor.quote}”

【你的问诊原则】：
1. 始终以第一人称（“我”）发言，称呼对方为“你”或“朋友”；
2. 保持先哲的真实原典性格、语言风格与思维逻辑，切勿像生硬的 AI 客服或心理咨询师那样只做情绪复述；
3. 运用苏格拉底产婆术、辨证法或现象学还原，抓住来访者回答中的逻辑矛盾、绝对化前设或形而上学执念，进行深度剖析；
4. 每次回复篇幅控制在 150-250 字左右，提出 1-2 个直抵灵魂深处的追问；
5. 如果交谈轮数较多（超过 2 轮），可适当肯定来访者的反思突破，并温和提示“如果你觉得我们已经抓住了根本病灶，随时可以点击【开立处方笺】”。`;

    const apiMessages: ChatMessagePayload[] = [
      { role: 'system', content: docSystemPrompt },
      ...newHistory.map((m) => ({
        role: (m.sender === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.text
      }))
    ];

    try {
      const reply = await callPhilosophicalLLM(
        apiConfig,
        apiMessages,
        { temperature: 0.7 }
      );

      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-doc-${Date.now()}`,
          sender: 'doctor',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      console.error('Doctor consultation error:', err);
      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-doc-err-${Date.now()}`,
          sender: 'doctor',
          text: `[先哲思绪因网络端点震颤而中断]：${err.message || '请检查网络连接或 API 配置。'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsDoctorTyping(false);
    }
  };

  // 阶段 3：结合整场深入问诊对话历史，由主治先哲开具终极处方笺
  const handleGeneratePrescription = async () => {
    if (!doctor || isGeneratingPrescription) return;

    setIsGeneratingPrescription(true);

    const fullTranscript = chatMessages
      .map((m) => `${m.sender === 'user' ? '【来访者】' : `【主治先哲·${doctor.philosopherName}】`}：${m.text}`)
      .join('\n\n');

    const prescriptionSystemPrompt = `你是由格尔德·阿申巴赫哲学实践学派特聘的主治先哲【${doctor.philosopherName}】。
你刚与来访者完成了一场多轮深入的 1-on-1 哲学闭门问诊。现在，你需要根据来访者最初的主诉以及整场问诊中暴露出的具体言论与思想脉络，开具一份严谨、深刻、量身定制的【形而上学辩证处方笺】。

【输出规范】：
请直接返回标准的 JSON 对象，不要包含 markdown 代码块标识（如 \`\`\`json 等）：
{
  "diagnosis": {
    "syndromeTitle": "高度提炼的哲学病理名称（结合交谈具体情境，如：目的论代偿性焦灼综合征、存在先行之荒谬回避症、新自由主义功绩自戕综合征）",
    "symptomDeconstruction": "200字左右现象学剖析：结合刚才问诊中来访者的具体表述，解构其痛苦背后的真实心理机制",
    "metaphysicalBlindSpot": "100字左右盲区剖析：在刚才的交谈中，来访者暴露出的最核心的未经审视的元假设或独断教条"
  },
  "doctorAnalysis": "300字左右：主治先哲以第一人称结案陈词，结合问诊交谈中的观点交锋，系统阐明为何在其哲学体系下这一困境是可以被消解与升华的",
  "mindAntidote": "一句话思想解毒剂（约30-50字，金句质感，直击神经，引人顿悟）",
  "prescribedRemedy": {
    "ontologicalShift": "150字左右本体论认知框架重构：如何从原先的狭隘视界跃迁至更高维度的生命视角",
    "dailyPraxis": [
      "微观实践作业1（根据交谈中的具体细节，提供今日即可落地的思想或行动微动作）",
      "微观实践作业2",
      "微观实践作业3"
    ],
    "recommendedReadings": [
      {
        "title": "先哲或对症哲学经典著作名",
        "author": "作者",
        "reason": "推荐理由与对症章节"
      },
      {
        "title": "另一部对症经典名",
        "author": "作者",
        "reason": "推荐理由与对症章节"
      }
    ]
  },
  "suggestedDebateQuestion": "先哲留给患者终身思考的一句终极叩问"
}`;

    const prescriptionUserPrompt = `【来访者初始主诉】：
“${userInquiry}”

【问诊全过程记录】：
${fullTranscript}

请作为主治先哲【${doctor.philosopherName}】，为本案结案并开具完整的形而上学处方笺。`;

    try {
      const content = await callPhilosophicalLLM(
        apiConfig,
        [
          { role: 'system', content: prescriptionSystemPrompt },
          { role: 'user', content: prescriptionUserPrompt }
        ],
        { temperature: 0.7 }
      );

      let parsed: any;
      try {
        let clean = content.trim();
        if (clean.startsWith('```')) {
          clean = clean.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
        }
        parsed = JSON.parse(clean);
      } catch {
        const m = content.match(/\{[\s\S]*\}/);
        if (m) parsed = JSON.parse(m[0]);
        else throw new Error('处方格式无法被解析为 JSON。');
      }

      const newPrescription: ClinicPrescription = {
        id: `RX-PHIL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        userInquiry,
        timestamp: new Date().toLocaleString('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        roundsOfConsultation: userTurnsCount,
        diagnosis: {
          syndromeTitle: parsed.diagnosis?.syndromeTitle || '形而上学失衡综合征',
          symptomDeconstruction: parsed.diagnosis?.symptomDeconstruction || '经由深入交谈，病理已趋明晰。',
          metaphysicalBlindSpot: parsed.diagnosis?.metaphysicalBlindSpot || '将相对的世俗标准视作绝对的终极价值。'
        },
        primaryDoctor: {
          philosopherId: doctor.philosopherId,
          philosopherName: doctor.philosopherName,
          doctorTitle: doctor.doctorTitle,
          school: doctor.school,
          avatar: doctor.avatar,
          quote: doctor.quote,
          analysis: parsed.doctorAnalysis || ''
        },
        mindAntidote: parsed.mindAntidote || '反思乃自由之始。',
        prescribedRemedy: {
          ontologicalShift: parsed.prescribedRemedy?.ontologicalShift || '',
          dailyPraxis: parsed.prescribedRemedy?.dailyPraxis || [
            '晨起静坐 5 分钟，划定今日不可控之事的边界。',
            '停止向外寻求证明，完成一次忠于内心的微小选择。',
            '在机械工作中发现一处无功利的微观美感。'
          ],
          recommendedReadings: parsed.prescribedRemedy?.recommendedReadings || []
        },
        suggestedDebateQuestion: parsed.suggestedDebateQuestion || '你究竟是害怕虚无，还是害怕为自由承担责任？'
      };

      setPrescription(newPrescription);
      setCheckedPraxis({});
      setStage('prescribed');

      setTimeout(() => {
        prescriptionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Prescription generation failed:', err);
      alert(`处方生成受阻：${err.message || '请重试'}`);
    } finally {
      setIsGeneratingPrescription(false);
    }
  };

  // 带着本案病历，一键跳转思辨台 1-on-1 继续辩难
  const handleTeleportToDialectic = () => {
    if (!doctor || !prescription) return;
    const initialQuestion = `【哲学心灵诊所 · 病历入舱】\n患者主诉：“${userInquiry}”\n深入问诊轮数：${prescription.roundsOfConsultation} 轮\n形而上学病理诊断：【${prescription.diagnosis.syndromeTitle}】\n盲区解构：${prescription.diagnosis.metaphysicalBlindSpot}\n\n${prescription.suggestedDebateQuestion}`;
    startChatWithPhilosopher(doctor.philosopherId, initialQuestion);
  };

  // 导出 2x Retina 高清黑金 Canvas 处方海报
  const handleExportPoster = async () => {
    if (!prescription || !canvasRef.current || !doctor) return;
    setIsExporting(true);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const scale = 2;
      canvas.width = 860 * scale;
      canvas.height = 1320 * scale;
      ctx.scale(scale, scale);

      const W = 860;
      const H = 1320;

      // 1. 深邃黑曜金背景
      ctx.fillStyle = '#0a0a0d';
      ctx.fillRect(0, 0, W, H);

      // 2. 边框金线
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(32, 32, W - 64, H - 64);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(40, 40, W - 80, H - 80);

      // 3. 表头
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('✦ THE ODYSSEY CLINIC · 形而上学辩证处方笺 ✦', 64, 76);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.fillText(
        `病历编号: ${prescription.id}  |  问诊轮数: ${prescription.roundsOfConsultation} 轮深谈  |  时间: ${prescription.timestamp}`,
        64,
        98
      );

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.moveTo(64, 115);
      ctx.lineTo(W - 64, 115);
      ctx.stroke();

      // 4. 来访者主诉
      ctx.fillStyle = '#d97706';
      ctx.font = 'bold 13px "Noto Serif SC", serif';
      ctx.fillText('【来访者初始主诉】', 64, 145);

      ctx.fillStyle = '#e4e4e7';
      ctx.font = 'italic 13px "Noto Serif SC", serif';
      const inquiryLines = wrapText(ctx, `“${prescription.userInquiry}”`, W - 128);
      inquiryLines.slice(0, 3).forEach((line, i) => {
        ctx.fillText(line, 64, 172 + i * 22);
      });

      const currentY1 = 172 + Math.min(inquiryLines.length, 3) * 22 + 18;

      // 5. 哲学病理确诊与盲区
      ctx.fillStyle = 'rgba(245, 158, 11, 0.06)';
      ctx.fillRect(64, currentY1, W - 128, 110);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.strokeRect(64, currentY1, W - 128, 110);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 18px "Noto Serif SC", serif';
      ctx.fillText(`病理确诊：${prescription.diagnosis.syndromeTitle}`, 84, currentY1 + 32);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '12px "Noto Serif SC", serif';
      const blindSpotLines = wrapText(
        ctx,
        `交谈暴露盲区：${prescription.diagnosis.metaphysicalBlindSpot}`,
        W - 168
      );
      blindSpotLines.slice(0, 3).forEach((line, i) => {
        ctx.fillText(line, 84, currentY1 + 62 + i * 20);
      });

      const currentY2 = currentY1 + 130;

      // 6. 主治先哲
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 14px "Noto Serif SC", serif';
      ctx.fillText('【1-on-1 主治先哲】', 64, currentY2 + 20);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px "Noto Serif SC", serif';
      ctx.fillText(doctor.philosopherName, 64, currentY2 + 56);

      ctx.fillStyle = '#a1a1aa';
      ctx.font = '12px "Noto Serif SC", serif';
      ctx.fillText(`${doctor.doctorTitle} · [${doctor.school}]`, 64, currentY2 + 80);

      // 先哲原典金句
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(64, currentY2 + 98, W - 128, 52);
      ctx.fillStyle = '#fef3c7';
      ctx.font = 'italic 13px "Noto Serif SC", serif';
      const quoteLines = wrapText(ctx, `药引金句：“${doctor.quote}”`, W - 168);
      quoteLines.slice(0, 2).forEach((line, i) => {
        ctx.fillText(line, 84, currentY2 + 125 + i * 20);
      });

      // 先哲医嘱
      const currentY3 = currentY2 + 170;
      ctx.fillStyle = '#d4d4d8';
      ctx.font = '12px "Noto Serif SC", serif';
      const analysisLines = wrapText(ctx, prescription.primaryDoctor.analysis, W - 128);
      analysisLines.slice(0, 6).forEach((line, i) => {
        ctx.fillText(line, 64, currentY3 + i * 22);
      });

      const currentY4 = currentY3 + Math.min(analysisLines.length, 6) * 22 + 24;

      // 7. 思想解毒剂
      ctx.fillStyle = 'rgba(217, 119, 6, 0.15)';
      ctx.fillRect(64, currentY4, W - 128, 70);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(64, currentY4, W - 128, 70);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillText('✦ 思想解毒剂 (MIND ANTIDOTE) ✦', 84, currentY4 + 26);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px "Noto Serif SC", serif';
      ctx.fillText(`“${prescription.mindAntidote}”`, 84, currentY4 + 52);

      const currentY5 = currentY4 + 94;

      // 8. 每日微观实践作业
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 14px "Noto Serif SC", serif';
      ctx.fillText('【每日微观修行作业】', 64, currentY5 + 20);

      prescription.prescribedRemedy.dailyPraxis.slice(0, 3).forEach((praxis, idx) => {
        ctx.fillStyle = '#e4e4e7';
        ctx.font = '12px "Noto Serif SC", serif';
        const pLines = wrapText(ctx, `${idx + 1}. ${praxis}`, W - 140);
        pLines.slice(0, 2).forEach((l, li) => {
          ctx.fillText(l, 74, currentY5 + 46 + idx * 36 + li * 18);
        });
      });

      // 9. 底部公章与印信
      ctx.fillStyle = '#52525b';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillText('ODYSSEY PHILOSOPHICAL PRACTICE · 人类思想全史思辨馆', 64, H - 54);

      ctx.strokeStyle = 'rgba(239, 68, 68, 0.7)';
      ctx.lineWidth = 2;
      ctx.strokeRect(W - 140, H - 90, 72, 34);
      ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
      ctx.font = 'bold 13px "Noto Serif SC", serif';
      ctx.fillText('先哲验印', W - 132, H - 68);

      // 触发下载
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Odyssey-Prescription-${doctor.philosopherName}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (e) {
      console.error('Poster export failed:', e);
    } finally {
      setIsExporting(false);
    }
  };

  // 文字换行
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const lines: string[] = [];
    let currentLine = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const testLine = currentLine + char;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden animate-fade-in text-zinc-200 select-text">
      {/* 隐藏画板用于 Canvas 2x 海报渲染 */}
      <canvas ref={canvasRef} className="hidden" />

      {/* ========================================================================= */}
      {/* 阶段 1：挂号与智能分诊台 (Triage Stage) */}
      {/* ========================================================================= */}
      {stage === 'triage' && (
        <div className="h-full overflow-y-auto custom-scrollbar px-3 sm:px-6 py-4 flex flex-col gap-6">
          {/* 顶部标语与哲学实践理念 */}
          <div className="liquid-glass-card rounded-2xl p-5 sm:p-6 border border-white/[0.08] relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-lg"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${activeEra.accentColor}33, #09090b)`,
                  boxShadow: `0 0 20px ${activeEra.accentColor}25`
                }}
              >
                <Stethoscope className="w-6 h-6" style={{ color: activeEra.accentColor }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold">
                    PHILOSOPHICAL CLINIC · 1-ON-1
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-xs text-zinc-400 font-serif">一对一深度问诊与形而上学处方</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold font-serif text-white tracking-tight">
                  “哲学不是解决痛苦的技术，而是重构生命意义的镜子”
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                  立足格尔德·阿申巴赫哲学实践论：根据您的现实困惑，从全馆 63 位先哲中
                  <span className="text-amber-300 font-medium"> 匹配一位最契合的主治先哲医生</span>。
                  先哲将与您展开一对一深入的苏格拉底式剖析交谈，在充分探查思想病灶后，为您开具专属的黑金处方笺。
                </p>
              </div>
            </div>

            {/* API 状态与快捷配置指示 */}
            <div className="shrink-0 flex items-center gap-2 self-stretch md:self-auto justify-end">
              {apiConfig?.apiKey ? (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>云端问诊就绪 ({apiConfig.model || 'DeepSeek'})</span>
                </div>
              ) : (
                <button
                  onClick={() => setIsApiConfigOpen(true)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-amber-300 text-xs font-mono transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  <span>配置 API Key 启用深度诊断</span>
                </button>
              )}
            </div>
          </div>

          {/* 挂号表单卡 */}
          <div className="liquid-glass-card rounded-2xl p-5 sm:p-6 border border-white/[0.08] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm sm:text-base font-bold font-serif text-white">
                  01 / 提出困惑 · 分诊匹配主治先哲
                </h3>
              </div>
              <span className="text-xs font-mono text-zinc-500">
                {userInquiry.length} 字
              </span>
            </div>

            {/* 6 大经典哲学症候群快捷胶囊 */}
            <div>
              <div className="text-xs text-zinc-400 mb-2 font-mono flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
                <span>经典哲学专科预选（点击直接代入典型情境）：</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {SYNDROME_PRESETS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-2.5 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between gap-1 group ${
                        isSelected
                          ? 'bg-amber-500/20 border-amber-500/50 text-white shadow-lg'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.06] text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-amber-400 group-hover:text-amber-300">
                          {preset.tag}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {preset.category.slice(0, 3)}
                        </span>
                      </div>
                      <span className="text-xs font-serif line-clamp-1 text-zinc-300 group-hover:text-white">
                        {preset.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 问诊自述输入框 */}
            <div className="relative">
              <textarea
                value={userInquiry}
                onChange={(e) => {
                  setUserInquiry(e.target.value);
                  setSelectedPresetId(null);
                  setErrorMessage(null);
                }}
                placeholder="请详述您此刻在现实生活、职场竞争、人际关系或终极存在中遭遇的真实困扰、焦虑或意义危机...（例如：我每天都在拼命追求更高的薪水与升职，但只要稍微停下脚步，巨大的空虚与被替代的恐惧就会将我吞噬...）"
                rows={4}
                className="w-full bg-black/40 border border-white/[0.1] rounded-xl p-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all resize-none leading-relaxed font-serif"
              />
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 提交按钮与 API 状态说明 */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              <div className="text-xs text-zinc-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-500/70" />
                <span>问诊基于大模型一对一深度辩证推理，全程隐私绝不上报。</span>
              </div>

              <button
                onClick={handleStartTriage}
                disabled={isTriageLoading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-serif font-bold text-sm text-zinc-950 flex items-center justify-center gap-2 shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
                }}
              >
                {isTriageLoading ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin text-zinc-950" />
                    <span>正遍历 63 位先哲进行专科分诊...</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="w-4 h-4 text-zinc-950" />
                    <span>匹配主治先哲 · 进入 1-on-1 问诊室</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 阶段 2：1-on-1 沉浸式闭门哲学问诊室 (Consultation Stage) */}
      {/* ========================================================================= */}
      {stage === 'consulting' && doctor && (
        <div className="h-full flex flex-col overflow-hidden gap-3 px-3 sm:px-6 py-2">
          {/* 主治医生信息栏 & 问诊深度条 */}
          <div className="liquid-glass-card rounded-2xl p-3 sm:p-4 border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shrink-0 shadow-lg">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img
                  src={doctor.avatar}
                  alt={doctor.philosopherName}
                  onError={handleImageFallback}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-bold font-serif text-white">
                    {doctor.philosopherName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
                    {doctor.doctorTitle}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                    [{doctor.school}]
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-serif line-clamp-1 max-w-xl mt-0.5">
                  <span className="text-zinc-500 font-mono">接诊因由：</span>
                  {doctor.matchingRationale}
                </p>
              </div>
            </div>

            {/* 问诊深度进度指示 */}
            <div className="flex items-center gap-4 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-white/[0.06] pt-2 md:pt-0">
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400">
                  <Flame className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    问诊深度：
                    {dialecticDepth === 1 && '初步探询'}
                    {dialecticDepth === 2 && '矛盾剥离'}
                    {dialecticDepth === 3 && '公理辩难'}
                    {dialecticDepth >= 4 && '视界跃迁 · 处方就绪'}
                  </span>
                </div>
                <div className="w-28 bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${(dialecticDepth / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* 查阅生平与换人按钮 */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => openPhilosopherById(doctor.philosopherId)}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-all"
                  title="查阅先哲大传"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                </button>
                <button
                  onClick={() => setStage('triage')}
                  className="px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-all"
                >
                  换个困惑
                </button>
              </div>
            </div>
          </div>

          {/* 问诊对话流 (Scrollable Chat Transcript) */}
          <div
            ref={chatScrollRef}
            className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-2 sm:px-4 py-3 flex flex-col gap-4"
          >
            {/* 初始主诉横幅 */}
            <div className="p-3.5 rounded-xl bg-black/30 border border-white/[0.06] text-xs text-zinc-400 font-serif leading-relaxed flex items-start gap-2.5">
              <span className="text-amber-400 font-bold font-mono shrink-0">【患者自述】</span>
              <span className="italic">“{userInquiry}”</span>
            </div>

            {/* 消息气泡流 */}
            {chatMessages.map((msg) => {
              const isDoctor = msg.sender === 'doctor';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[88%] sm:max-w-[78%] ${
                    isDoctor ? 'self-start' : 'self-end flex-row-reverse'
                  }`}
                >
                  {/* 头像 */}
                  {isDoctor ? (
                    <img
                      src={doctor.avatar}
                      alt={doctor.philosopherName}
                      onError={handleImageFallback}
                      className="w-9 h-9 rounded-xl object-cover border border-amber-500/40 shrink-0 mt-0.5 shadow-md"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold text-white">
                      我
                    </div>
                  )}

                  {/* 气泡内容 */}
                  <div className="flex flex-col gap-1">
                    <div
                      className={`text-[10px] font-mono ${
                        isDoctor ? 'text-amber-400/80' : 'text-zinc-500 text-right'
                      }`}
                    >
                      {isDoctor ? doctor.philosopherName : '来访者'} · {msg.timestamp}
                    </div>

                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed font-serif ${
                        isDoctor
                          ? 'bg-zinc-900/90 border border-amber-500/25 text-zinc-100 shadow-lg whitespace-pre-line'
                          : 'bg-gradient-to-r from-amber-600/80 to-amber-700/80 text-white shadow-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* 思考中打字指示 */}
            {isDoctorTyping && (
              <div className="flex items-center gap-3 self-start max-w-[80%]">
                <img
                  src={doctor.avatar}
                  alt={doctor.philosopherName}
                  onError={handleImageFallback}
                  className="w-8 h-8 rounded-xl object-cover border border-amber-500/40 opacity-70"
                />
                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-amber-500/20 text-xs font-serif text-amber-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-150" />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce delay-300" />
                  <span>{doctor.philosopherName} 正在凝思你的认知盲区...</span>
                </div>
              </div>
            )}
          </div>

          {/* 快捷思考提示胶囊 */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 shrink-0">
            <span className="text-[11px] font-mono text-zinc-500 shrink-0">快捷探问：</span>
            {[
              '我为什么总是无法摆脱对他人评价的渴望？',
              '如果一切终将归于虚无，当下的挣扎还有何意义？',
              '我该如何从行动上真正做到“知行合一”或“放下”？'
            ].map((hint, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(hint)}
                disabled={isDoctorTyping}
                className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-[11px] font-serif text-zinc-400 hover:text-amber-200 transition-all whitespace-nowrap shrink-0 disabled:opacity-40"
              >
                {hint}
              </button>
            ))}
          </div>

          {/* 底部输入框与终极开方操作条 */}
          <div className="liquid-glass-card rounded-2xl p-3 border border-white/[0.08] shrink-0 flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <textarea
                value={draftInput}
                onChange={(e) => setDraftInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={`与 ${doctor.philosopherName} 深入交谈... 回复他的反问，或者进一步表达你的怀疑（Enter 发送，Shift+Enter 换行）`}
                rows={2}
                className="flex-1 bg-black/40 border border-white/[0.1] rounded-xl p-2.5 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/60 transition-all resize-none font-serif leading-relaxed"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!draftInput.trim() || isDoctorTyping}
                className="px-4 py-3 rounded-xl font-bold text-xs text-black flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100"
                style={{
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)'
                }}
              >
                <Send className="w-3.5 h-3.5" />
                <span>回应</span>
              </button>
            </div>

            {/* 终极开立处方按钮横幅（只要交谈了至少 1 轮就可随时开立） */}
            {userTurnsCount >= 1 && (
              <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                <div className="text-[11px] text-zinc-400 font-serif flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>已完成 {userTurnsCount} 轮深入问诊交谈，思想病灶已清晰显露。</span>
                </div>

                <button
                  onClick={handleGeneratePrescription}
                  disabled={isGeneratingPrescription}
                  className="px-5 py-2 rounded-xl font-serif font-bold text-xs text-zinc-950 flex items-center gap-2 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  {isGeneratingPrescription ? (
                    <>
                      <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                      <span>{doctor.philosopherName} 正在综合整场问诊开立处方...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5" />
                      <span>📜 结束问诊，由【{doctor.philosopherName}】开具形而上学处方笺 →</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 阶段 3：处方笺结案展陈 (Prescription Stage) */}
      {/* ========================================================================= */}
      {stage === 'prescribed' && prescription && doctor && (
        <div
          ref={prescriptionRef}
          className="h-full overflow-y-auto custom-scrollbar px-3 sm:px-6 py-4 flex flex-col gap-6"
        >
          {/* 返回交谈指示条 */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStage('consulting')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>返回 1-on-1 问诊室继续交谈</span>
            </button>

            <span className="text-xs font-mono text-zinc-500">
              历经 {prescription.roundsOfConsultation} 轮苏格拉底式闭门辨难
            </span>
          </div>

          {/* 黑金液态玻璃典藏处方笺 */}
          <div
            className="liquid-glass-card rounded-2xl p-6 sm:p-8 border border-amber-500/30 relative overflow-hidden flex flex-col gap-6 shadow-2xl animate-fade-in"
            style={{
              background: 'linear-gradient(180deg, rgba(20, 20, 26, 0.95) 0%, rgba(10, 10, 14, 0.98) 100%)',
              boxShadow: '0 0 40px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(245, 158, 11, 0.05)'
            }}
          >
            {/* 处方笺顶部装饰表头 */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-mono font-bold tracking-widest uppercase">
                    PRESCRIPTION SHEET · 结案处方
                  </span>
                  <span className="text-xs font-mono text-zinc-500">
                    {prescription.id}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-wide mt-1">
                  形而上学辩证处方笺
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                <span>开立时间：{prescription.timestamp}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                  ● 终审医嘱
                </span>
              </div>
            </div>

            {/* 来访者初始主诉 */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-xs sm:text-sm text-zinc-300 font-serif leading-relaxed">
              <span className="text-amber-400 font-bold font-mono mr-2">【来访者主诉】</span>
              “{prescription.userInquiry}”
            </div>

            {/* 核心诊断：哲学病理剖析 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 哲学病理确诊 */}
              <div className="p-4 rounded-xl bg-amber-500/[0.06] border border-amber-500/25 flex flex-col justify-between gap-3">
                <div>
                  <div className="text-[11px] font-mono text-amber-400 font-bold uppercase tracking-wider mb-1">
                    01 / 哲学病理确诊
                  </div>
                  <div className="text-base sm:text-lg font-bold font-serif text-white">
                    {prescription.diagnosis.syndromeTitle}
                  </div>
                  <p className="text-xs text-zinc-300 font-serif mt-2 leading-relaxed">
                    {prescription.diagnosis.symptomDeconstruction}
                  </p>
                </div>
              </div>

              {/* 形而上学盲区 */}
              <div className="p-4 rounded-xl bg-rose-500/[0.05] border border-rose-500/25 flex flex-col justify-between gap-3">
                <div>
                  <div className="text-[11px] font-mono text-rose-400 font-bold uppercase tracking-wider mb-1">
                    02 / 问诊暴露之形而上学盲区 (独断教条)
                  </div>
                  <div className="text-sm sm:text-base font-bold font-serif text-rose-200">
                    隐秘认知公理漏洞
                  </div>
                  <p className="text-xs text-zinc-300 font-serif mt-2 leading-relaxed">
                    {prescription.diagnosis.metaphysicalBlindSpot}
                  </p>
                </div>
              </div>
            </div>

            {/* 主治先哲结案展台与辩难医嘱 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.1] flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={doctor.avatar}
                      alt={doctor.philosopherName}
                      onError={handleImageFallback}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/50 shadow-xl"
                    />
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded bg-amber-500 text-black font-mono font-bold text-[9px] uppercase">
                      主治名医
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                        {doctor.philosopherName}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 text-xs font-mono">
                        {doctor.school}
                      </span>
                    </div>
                    <div className="text-xs text-amber-400 font-serif mt-0.5">
                      {doctor.doctorTitle}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openPhilosopherById(doctor.philosopherId)}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>查阅先哲生平大传与思想档案</span>
                </button>
              </div>

              {/* 药引名言 */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-xs sm:text-sm text-amber-200 font-serif italic">
                药引金句：“{doctor.quote}”
              </div>

              {/* 先哲辩难医嘱长文 */}
              <div className="text-xs sm:text-sm text-zinc-300 font-serif leading-relaxed whitespace-pre-line">
                <span className="text-amber-400 font-bold font-mono mr-1">【主治医生结案医嘱】</span>
                {prescription.primaryDoctor.analysis}
              </div>
            </div>

            {/* 一句话思想解毒剂 (Mind Antidote) */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-transparent border border-amber-500/40 relative overflow-hidden">
              <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-400 mb-1">
                ✦ 思想解毒剂 (MIND ANTIDOTE) ✦
              </div>
              <div className="text-base sm:text-xl font-bold font-serif text-white tracking-wide leading-snug">
                “{prescription.mindAntidote}”
              </div>
              <div className="text-xs text-zinc-400 font-serif mt-2">
                本体论跃迁：{prescription.prescribedRemedy.ontologicalShift}
              </div>
            </div>

            {/* 每日修行作业 & 推荐书单 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* 微观践行作业 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>每日微观思想修行作业 (今日即可执行)</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {Object.values(checkedPraxis).filter(Boolean).length}/
                    {prescription.prescribedRemedy.dailyPraxis.length} 完成
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {prescription.prescribedRemedy.dailyPraxis.map((praxis, idx) => {
                    const isChecked = !!checkedPraxis[idx];
                    return (
                      <button
                        key={idx}
                        onClick={() =>
                          setCheckedPraxis((prev) => ({ ...prev, [idx]: !prev[idx] }))
                        }
                        className={`p-2.5 rounded-lg border text-left text-xs font-serif transition-all duration-200 flex items-start gap-2.5 ${
                          isChecked
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-400 line-through'
                            : 'bg-white/[0.02] border-white/[0.06] text-zinc-200 hover:bg-white/[0.05]'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500 text-black'
                              : 'border-zinc-500'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>
                          {idx + 1}. {praxis}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 对症经典书单 */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.08] flex flex-col gap-3">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>对症心智典籍推荐</span>
                </div>
                <div className="flex flex-col gap-2">
                  {prescription.prescribedRemedy.recommendedReadings.map((reading, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex flex-col gap-0.5"
                    >
                      <div className="flex items-center justify-between text-xs font-serif font-bold text-zinc-200">
                        <span>{reading.title}</span>
                        <span className="text-zinc-500 font-mono text-[11px]">
                          {reading.author}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-serif">
                        {reading.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 闭环行动坞 (Action Dock) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setStage('consulting')}
                  className="px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono text-zinc-200 hover:text-white flex items-center gap-2 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                  <span>返回问诊室继续交谈</span>
                </button>

                <button
                  onClick={handleTeleportToDialectic}
                  className="px-5 py-2.5 rounded-xl font-serif font-bold text-xs text-black flex items-center gap-1.5 shadow-lg transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)'
                  }}
                >
                  <span>带着病历移交思辨台 1-on-1 →</span>
                </button>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={handleExportPoster}
                  disabled={isExporting}
                  className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/35 text-xs font-mono text-amber-300 flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>{isExporting ? '生成海报中...' : '导出黑金处方笺'}</span>
                </button>

                <button
                  onClick={() => {
                    setStage('triage');
                    setUserInquiry('');
                    setDoctor(null);
                    setChatMessages([]);
                    setPrescription(null);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-all"
                  title="重新挂号接诊下一位患者"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>重新挂号</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
