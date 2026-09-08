// src/utils/aiClient.ts
// 全功能先哲思辨 AI 客户端：原生全面支持 Anthropic, OpenAI, DeepSeek, OpenRouter, SiliconFlow, Moonshot, Zhipu, Groq, Ollama 等

export type ApiProviderId = 
  | 'deepseek'
  | 'openai'
  | 'anthropic'
  | 'openrouter'
  | 'siliconflow'
  | 'moonshot'
  | 'zhipu'
  | 'groq'
  | 'ollama'
  | 'custom';

export interface ProviderPreset {
  id: ApiProviderId;
  name: string;
  badge: string;
  baseUrl: string;
  defaultModel: string;
  popularModels: string[];
  docUrl: string;
  keyPlaceholder: string;
  description: string;
  isNativeAnthropic?: boolean;
}

export const API_PROVIDERS: ProviderPreset[] = [
  {
    id: 'deepseek',
    name: 'DeepSeek (深度求索)',
    badge: '推荐 · 哲思推理首选',
    baseUrl: 'https://api.deepseek.com/v1',
    defaultModel: 'deepseek-chat',
    popularModels: ['deepseek-chat', 'deepseek-reasoner'],
    docUrl: 'https://platform.deepseek.com/api_keys',
    keyPlaceholder: 'sk-...',
    description: '极高性价比，深度思辨逻辑极强，原生支持 V3 与 R1 深度思考模型。'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    badge: '主流旗舰',
    baseUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o',
    popularModels: ['gpt-4o', 'gpt-4o-mini', 'o3-mini', 'gpt-4.5-preview'],
    docUrl: 'https://platform.openai.com/api-keys',
    keyPlaceholder: 'sk-...',
    description: '全球通用大模型标杆，具备极高知识密度与哲学引经据典能力。'
  },
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    badge: '原生 Claude 支持',
    baseUrl: 'https://api.anthropic.com/v1',
    defaultModel: 'claude-3-7-sonnet-20250219',
    popularModels: ['claude-3-7-sonnet-20250219', 'claude-3-5-sonnet-20241022', 'claude-3-5-haiku-20241022'],
    docUrl: 'https://console.anthropic.com/settings/keys',
    keyPlaceholder: 'sk-ant-api03-...',
    description: '文学性与哲学修辞顶级，支持浏览器安全直连与 Messages 原生 API。',
    isNativeAnthropic: true
  },
  {
    id: 'openrouter',
    name: 'OpenRouter (全模型聚合)',
    badge: '全球免翻聚合网关',
    baseUrl: 'https://openrouter.ai/api/v1',
    defaultModel: 'anthropic/claude-3.7-sonnet',
    popularModels: [
      'anthropic/claude-3.7-sonnet',
      'openai/gpt-4o',
      'deepseek/deepseek-chat',
      'deepseek/deepseek-r1',
      'google/gemini-2.5-flash'
    ],
    docUrl: 'https://openrouter.ai/keys',
    keyPlaceholder: 'sk-or-v1-...',
    description: '一个 Key 畅联全球所有顶尖模型（Claude / GPT / Gemini / DeepSeek），自带浏览器 CORS 友好。'
  },
  {
    id: 'siliconflow',
    name: 'SiliconFlow (硅基流动)',
    badge: '国内低延迟高并发',
    baseUrl: 'https://api.siliconflow.cn/v1',
    defaultModel: 'deepseek-ai/DeepSeek-V3',
    popularModels: [
      'deepseek-ai/DeepSeek-V3',
      'deepseek-ai/DeepSeek-R1',
      'Qwen/Qwen2.5-72B-Instruct'
    ],
    docUrl: 'https://cloud.siliconflow.cn/account/ak',
    keyPlaceholder: 'sk-...',
    description: '国内高速直连，免代理，支持 DeepSeek-V3 与开源先锋 Qwen。'
  },
  {
    id: 'moonshot',
    name: 'Moonshot AI (月之暗面 Kimi)',
    badge: '长文本理解',
    baseUrl: 'https://api.moonshot.cn/v1',
    defaultModel: 'moonshot-v1-8k',
    popularModels: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'],
    docUrl: 'https://platform.moonshot.cn/console/api-keys',
    keyPlaceholder: 'sk-...',
    description: '超长上下文原典研读，适合一次性喂入大篇幅哲学文献。'
  },
  {
    id: 'zhipu',
    name: 'Zhipu AI (智谱清言 GLM)',
    badge: '清华系双语基石',
    baseUrl: 'https://open.bigmodel.cn/api/paas/v4',
    defaultModel: 'glm-4-plus',
    popularModels: ['glm-4-plus', 'glm-4-flash', 'glm-4-air'],
    docUrl: 'https://bigmodel.cn/usercenter/apikeys',
    keyPlaceholder: '...',
    description: '中文哲学与先秦东亚传统思想理解极深，国内秒级直连。'
  },
  {
    id: 'groq',
    name: 'Groq (超高 TPS 推理)',
    badge: '闪电极速生成',
    baseUrl: 'https://api.groq.com/openai/v1',
    defaultModel: 'llama-3.3-70b-versatile',
    popularModels: ['llama-3.3-70b-versatile', 'deepseek-r1-distill-llama-70b'],
    docUrl: 'https://console.groq.com/keys',
    keyPlaceholder: 'gsk_...',
    description: 'LPU 专用芯片加速，500+ tokens/s 瞬间完成哲学辩论长篇大论。'
  },
  {
    id: 'ollama',
    name: 'Ollama (本地私有化部署)',
    badge: '100% 离线私密 · 零成本',
    baseUrl: 'http://localhost:11434/v1',
    defaultModel: 'llama3.3',
    popularModels: ['llama3.3', 'qwen2.5:72b', 'deepseek-r1:14b', 'mistral'],
    docUrl: 'https://ollama.com',
    keyPlaceholder: '无需填写 (留空即可)',
    description: '本地硬件运行，不消耗任何费用，数据 100% 本地不出网。'
  },
  {
    id: 'custom',
    name: '自定义中转 / OneAPI 网关',
    badge: '自由定制',
    baseUrl: 'https://your-custom-proxy.com/v1',
    defaultModel: 'gpt-4o',
    popularModels: ['gpt-4o', 'claude-3-7-sonnet', 'deepseek-chat'],
    docUrl: '',
    keyPlaceholder: 'sk-...',
    description: '支持任何标准 OpenAI 或 OneAPI / NewAPI / Cloudflare Worker 中转服务。'
  }
];

export interface UnifiedApiConfig {
  provider?: ApiProviderId;
  baseUrl: string;
  apiKey: string;
  model: string;
  temperature?: number;
}

export interface ChatMessagePayload {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * 智能判断当前配置是否属于 Anthropic 原生端点
 */
export function isAnthropicNative(config: UnifiedApiConfig): boolean {
  if (config.provider === 'anthropic') return true;
  const base = (config.baseUrl || '').toLowerCase();
  return base.includes('anthropic.com');
}

/**
 * 统一的大语言模型调用入口
 * 自动识别并适配 Anthropic Messages API 原生协议 或 OpenAI / DeepSeek / OpenRouter 兼容协议
 */
export async function callPhilosophicalLLM(
  config: UnifiedApiConfig,
  messages: ChatMessagePayload[],
  options?: {
    temperature?: number;
    maxTokens?: number;
  }
): Promise<string> {
  const apiKey = (config.apiKey || '').trim();
  const baseUrl = (config.baseUrl || '').trim().replace(/\/+$/, '');
  const model = (config.model || '').trim() || 'deepseek-chat';
  const temperature = options?.temperature ?? config.temperature ?? 0.8;
  const maxTokens = options?.maxTokens ?? 4096;

  // 1. Anthropic 原生 Messages API 协议
  if (isAnthropicNative(config)) {
    const endpoint = baseUrl.endsWith('/messages') ? baseUrl : `${baseUrl}/messages`;

    // Anthropic 要求将 system prompt 独立提取，不能作为 messages 数组项
    const systemMessages = messages.filter(m => m.role === 'system');
    const conversationMessages = messages
      .filter(m => m.role !== 'system')
      .map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      }));

    const systemPrompt = systemMessages.map(m => m.content).join('\n\n');

    // 保证至少有一条 user message
    if (conversationMessages.length === 0) {
      conversationMessages.push({ role: 'user', content: '（静候先哲赐教）' });
    }

    const payload: any = {
      model,
      max_tokens: maxTokens,
      messages: conversationMessages,
      temperature
    };

    if (systemPrompt) {
      payload.system = systemPrompt;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true' // 允许浏览器端直连
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      let errText = '';
      try {
        const errJson = await response.json();
        errText = errJson.error?.message || JSON.stringify(errJson);
      } catch {
        errText = await response.text();
      }
      throw new Error(`Anthropic API [${response.status}]: ${errText || response.statusText}`);
    }

    const data = await response.json();
    const content = data.content?.[0]?.text;
    if (!content) {
      throw new Error('Anthropic 未返回文本内容');
    }
    return content;
  }

  // 2. OpenAI / DeepSeek / OpenRouter / SiliconFlow / Ollama 等标准 OpenAI 兼容协议
  let endpoint = baseUrl;
  if (!endpoint.endsWith('/chat/completions')) {
    endpoint = `${endpoint}/chat/completions`;
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  // OpenRouter 友好标识
  if (baseUrl.includes('openrouter.ai')) {
    headers['HTTP-Referer'] = window.location.origin;
    headers['X-Title'] = 'The Odyssey of Mind - Philosophical Museum';
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens
    })
  });

  if (!response.ok) {
    let errText = '';
    try {
      const errJson = await response.json();
      errText = errJson.error?.message || JSON.stringify(errJson);
    } catch {
      errText = await response.text();
    }
    throw new Error(`API Error [${response.status}]: ${errText || response.statusText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text && text !== '') {
    throw new Error('服务商未返回任何文本内容');
  }
  return text;
}

/**
 * 测试 API 配置连通性
 */
export async function testApiConnection(config: UnifiedApiConfig): Promise<{ success: boolean; message: string; latencyMs: number }> {
  const startTime = Date.now();
  try {
    const testMessages: ChatMessagePayload[] = [
      {
        role: 'system',
        content: '你是一位精通苏格拉底产婆术的哲人。请只回复 2 到 4 个字向人类简短致意，切勿多言。'
      },
      {
        role: 'user',
        content: '你好。'
      }
    ];

    const reply = await callPhilosophicalLLM(config, testMessages, { maxTokens: 30, temperature: 0.1 });
    const latencyMs = Date.now() - startTime;
    return {
      success: true,
      message: `连通成功！先哲回应：“${reply.trim()}”`,
      latencyMs
    };
  } catch (err: any) {
    const latencyMs = Date.now() - startTime;
    return {
      success: false,
      message: err.message || '连接失败，请检查网络、Base URL 或 API Key 是否有效。',
      latencyMs
    };
  }
}
