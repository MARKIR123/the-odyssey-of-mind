import React, { useState } from 'react';
import { useEpoch } from '../../context/EpochContext';
import { API_PROVIDERS, ApiProviderId, testApiConnection } from '../../utils/aiClient';
import { Key, X, Check, ShieldCheck, ExternalLink, Activity, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';

export const ApiKeyModal: React.FC = () => {
  const { isApiConfigOpen, setIsApiConfigOpen, apiConfig, setApiConfig } = useEpoch();

  const [currentProvider, setCurrentProvider] = useState<ApiProviderId>(apiConfig.provider || 'deepseek');
  const [baseUrl, setBaseUrl] = useState(apiConfig.baseUrl || 'https://api.deepseek.com/v1');
  const [apiKey, setApiKey] = useState(apiConfig.apiKey || '');
  const [model, setModel] = useState(apiConfig.model || 'deepseek-chat');
  const [isSaved, setIsSaved] = useState(false);

  // Connection testing state
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs: number } | null>(null);

  if (!isApiConfigOpen) return null;

  const activePreset = API_PROVIDERS.find(p => p.id === currentProvider) || API_PROVIDERS[0];

  const handleSelectProvider = (providerId: ApiProviderId) => {
    setCurrentProvider(providerId);
    const preset = API_PROVIDERS.find(p => p.id === providerId);
    if (preset) {
      setBaseUrl(preset.baseUrl);
      setModel(preset.defaultModel);
      setTestResult(null);
    }
  };

  const handleSelectModel = (modelName: string) => {
    setModel(modelName);
  };

  const handleSave = () => {
    setApiConfig({
      provider: currentProvider,
      baseUrl: baseUrl.trim(),
      apiKey: apiKey.trim(),
      model: model.trim()
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      setIsApiConfigOpen(false);
    }, 800);
  };

  const handleClear = () => {
    setApiConfig({
      provider: 'deepseek',
      baseUrl: 'https://api.deepseek.com/v1',
      apiKey: '',
      model: 'deepseek-chat'
    });
    setCurrentProvider('deepseek');
    setApiKey('');
    setBaseUrl('https://api.deepseek.com/v1');
    setModel('deepseek-chat');
    setTestResult(null);
  };

  const handleRunTest = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testApiConnection({
        provider: currentProvider,
        baseUrl: baseUrl.trim(),
        apiKey: apiKey.trim(),
        model: model.trim()
      });
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || '测试出错，请检查网络或配置',
        latencyMs: 0
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={() => setIsApiConfigOpen(false)}
    >
      <div 
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border border-epoch-border bg-[#0d0d12]/95 p-5 sm:p-7 shadow-2xl backdrop-blur-2xl text-epoch-text space-y-5 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-epoch-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30 shadow-[0_0_16px_rgba(245,158,11,0.2)]">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-serif text-white tracking-tight">
                  多服务商 AI 先哲思辨接口
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                  主流全覆盖
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                支持 Anthropic (Claude), OpenAI, DeepSeek, 硅基流动, OpenRouter 等主流大模型
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsApiConfigOpen(false)}
            className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-5 text-xs">
          {/* Security Banner */}
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong>100% 浏览器本地直连保障</strong>：你的 API Key 仅保存在当前浏览器的 LocalStorage 中，直接向服务商端点发起安全请求（已配置 Anthropic / OpenAI 浏览器跨域白名单），绝不经过任何第三方服务器中转。
            </span>
          </div>

          {/* Provider Selection Grid */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="text-stone-200 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>选择大模型服务商 (Provider)：</span>
              </label>
              <span className="text-zinc-500 text-[11px] font-mono">
                {API_PROVIDERS.length} 家精选服务商
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {API_PROVIDERS.map((preset) => {
                const isSelected = currentProvider === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectProvider(preset.id)}
                    className={`p-2.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400/80 shadow-[0_0_16px_rgba(245,158,11,0.25)] text-white'
                        : 'bg-white/[0.03] border-white/10 hover:border-amber-400/40 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <div className="font-bold text-[12px] truncate">{preset.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-zinc-400 truncate">{preset.badge}</div>
                  </button>
                );
              })}
            </div>

            {/* Provider Brief Note */}
            <div className="p-2.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/20 flex items-center justify-between gap-2 text-[11px] text-amber-200/90">
              <span>{activePreset.description}</span>
              {activePreset.docUrl && (
                <a
                  href={activePreset.docUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 flex items-center gap-1 px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-[10px] transition-colors"
                >
                  <span>获取 Key ↗</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Model Selector Pills */}
          <div className="space-y-1.5">
            <label className="text-stone-300 font-medium">推荐主流模型快捷切换：</label>
            <div className="flex flex-wrap gap-1.5">
              {activePreset.popularModels.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleSelectModel(m)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-mono transition-all cursor-pointer ${
                    model === m
                      ? 'bg-amber-400 text-stone-950 font-bold shadow-sm'
                      : 'bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Base URL */}
            <div className="space-y-1 sm:col-span-2">
              <div className="flex items-center justify-between text-stone-300">
                <label className="font-medium">API Base URL：</label>
                {activePreset.isNativeAnthropic && (
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded">
                    原生 Messages 协议
                  </span>
                )}
              </div>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder={activePreset.baseUrl}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
              />
            </div>

            {/* Model Name */}
            <div className="space-y-1">
              <label className="text-stone-300 font-medium">模型名称 (Model ID)：</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={activePreset.defaultModel}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
              />
            </div>

            {/* API Key */}
            <div className="space-y-1">
              <label className="text-stone-300 font-medium">API Key：</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={activePreset.keyPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white focus:outline-none focus:border-amber-400 font-mono text-xs"
              />
            </div>
          </div>

          {/* Connection Test Section */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" />
                <span>接口连通性测试</span>
              </div>
              <div className="text-[11px] text-zinc-400">
                向先哲发起一次极简握手问答，验证 Key 与端点是否正常通畅。
              </div>
            </div>

            <button
              type="button"
              onClick={handleRunTest}
              disabled={isTesting || (!apiKey && currentProvider !== 'ollama')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {isTesting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>正在连通测试...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>测试连通性</span>
                </>
              )}
            </button>
          </div>

          {/* Test Result Banner */}
          {testResult && (
            <div className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 animate-fade-in ${
              testResult.success
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {testResult.success ? (
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <div className="font-bold flex items-center gap-2">
                  <span>{testResult.success ? '测试通过' : '测试失败'}</span>
                  {testResult.latencyMs > 0 && (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-black/40">
                      延迟: {testResult.latencyMs}ms
                    </span>
                  )}
                </div>
                <div className="text-[11px] opacity-90 leading-relaxed font-serif">
                  {testResult.message}
                </div>
              </div>
            </div>
          )}

          <div className="text-[11px] text-zinc-500">
            ✦ 提示：如未配置自定义 API Key，网站将自动降级为内置的高保真哲思推演引擎，随时零门槛畅玩。
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-3.5 border-t border-white/10 shrink-0">
          <button
            onClick={handleClear}
            className="text-xs text-rose-400 hover:text-rose-300 hover:underline cursor-pointer"
          >
            重置为默认 (DeepSeek)
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => setIsApiConfigOpen(false)}
              className="px-4 py-2 rounded-xl border border-white/15 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-stone-950 font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
            >
              {isSaved ? <Check className="w-4 h-4" /> : null}
              <span>{isSaved ? '已保存！' : '保存当前配置'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
