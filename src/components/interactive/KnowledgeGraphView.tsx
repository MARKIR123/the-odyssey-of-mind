import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { GRAPH_NODES, GRAPH_LINKS } from '../../data/knowledgeGraphData';
import { useEpoch } from '../../context/EpochContext';
import {
  Share2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Search,
  Layers,
  ArrowUpRight,
  Filter,
  Compass,
  X
} from 'lucide-react';
import { GraphNode, GraphLink } from '../../types/philosophy';

interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isDragging?: boolean;
}

export const KnowledgeGraphView: React.FC = () => {
  const { activeEra, openPhilosopherById, openCulturalEchoById } = useEpoch();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 视口与交互状态
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<SimNode | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'philosopher' | 'school' | 'concept' | 'echo'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 物理模拟引用
  const nodesRef = useRef<SimNode[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const isPanningRef = useRef<boolean>(false);
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const draggedNodeRef = useRef<SimNode | null>(null);
  const simulationAlphaRef = useRef<number>(1.0); // 退火参数

  // 计算当前高亮的关联节点与连线集合
  const activeFocusNode = hoveredNode || selectedNode;
  const connectedNodeIds = useMemo(() => {
    if (!activeFocusNode) return null;
    const ids = new Set<string>([activeFocusNode.id]);
    GRAPH_LINKS.forEach(link => {
      if (link.source === activeFocusNode.id) ids.add(link.target);
      if (link.target === activeFocusNode.id) ids.add(link.source);
    });
    return ids;
  }, [activeFocusNode]);

  // 初始化节点坐标（螺旋星云布局）
  const initNodes = useCallback((width: number, height: number) => {
    const cx = width / 2;
    const cy = height / 2;
    nodesRef.current = GRAPH_NODES.map((node, i) => {
      // 依类型与时代分散在星云轨道中
      const angle = i * 0.45;
      const radius = 60 + Math.sqrt(i + 1) * 55;
      return {
        ...node,
        x: cx + Math.cos(angle) * radius + (Math.random() - 0.5) * 20,
        y: cy + Math.sin(angle) * radius + (Math.random() - 0.5) * 20,
        vx: 0,
        vy: 0,
      };
    });
    simulationAlphaRef.current = 1.0;
  }, []);

  // 监听容器自适应尺度
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const canvas = canvasRef.current;
      if (!canvas || rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      // 如果尚未初始化节点，则在此刻初始化
      if (nodesRef.current.length === 0) {
        initNodes(rect.width, rect.height);
      }
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [initNodes]);

  // 稳定的物理引擎与 Canvas 渲染循环
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const runFrame = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) {
        animationFrameRef.current = requestAnimationFrame(runFrame);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nodes = nodesRef.current;
      const cx = width / 2;
      const cy = height / 2;

      // 1. 物理迭代计算（当 alpha > 0.005 或正在拖拽时运行）
      if (simulationAlphaRef.current > 0.005 || draggedNodeRef.current) {
        const alpha = simulationAlphaRef.current;

        // A. 节点间库仑斥力
        const kRepel = 3200 * alpha;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const distSq = dx * dx + dy * dy + 400; // 软化因子避免除零
            const dist = Math.sqrt(distSq);
            if (dist < 320) {
              const f = kRepel / distSq;
              const fx = (dx / dist) * f;
              const fy = (dy / dist) * f;
              if (!nodes[i].isDragging) {
                nodes[i].vx -= fx;
                nodes[i].vy -= fy;
              }
              if (!nodes[j].isDragging) {
                nodes[j].vx += fx;
                nodes[j].vy += fy;
              }
            }
          }
        }

        // B. 关系弹簧引力 (Hooke's Law: F = k * (dist - targetDist))
        const kSpring = 0.035 * alpha;
        const idealDist = 115;
        GRAPH_LINKS.forEach(link => {
          const s = nodes.find(n => n.id === link.source);
          const t = nodes.find(n => n.id === link.target);
          if (s && t) {
            const dx = t.x - s.x;
            const dy = t.y - s.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const delta = dist - idealDist;
            const f = kSpring * delta;
            const fx = (dx / dist) * f;
            const fy = (dy / dist) * f;
            if (!s.isDragging) {
              s.vx += fx;
              s.vy += fy;
            }
            if (!t.isDragging) {
              t.vx -= fx;
              t.vy -= fy;
            }
          }
        });

        // C. 中心引力、摩擦衰减与速度限幅
        nodes.forEach(node => {
          if (node.isDragging) return;
          node.vx += (cx - node.x) * 0.003 * alpha;
          node.vy += (cy - node.y) * 0.003 * alpha;
          node.vx *= 0.88; // 阻尼衰减
          node.vy *= 0.88;

          const spd = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
          if (spd > 8) {
            node.vx = (node.vx / spd) * 8;
            node.vy = (node.vy / spd) * 8;
          }

          node.x += node.vx;
          node.y += node.vy;
        });

        // 退火衰减
        if (!draggedNodeRef.current) {
          simulationAlphaRef.current *= 0.992;
        }
      }

      // 2. 绘制星系网络
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // 深空暗夜背景与星光尘埃
      ctx.fillStyle = '#06070a';
      ctx.fillRect(0, 0, width, height);

      // 绘制背景微弱坐标光晕
      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(width, height) * 0.7);
      grad.addColorStop(0, 'rgba(217, 119, 6, 0.04)');
      grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.02)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 应用平移与缩放矩阵
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      // 绘制连接线 (Links)
      GRAPH_LINKS.forEach(link => {
        const sourceNode = nodes.find(n => n.id === link.source);
        const targetNode = nodes.find(n => n.id === link.target);
        if (!sourceNode || !targetNode) return;

        const isLinkConnected =
          activeFocusNode &&
          (link.source === activeFocusNode.id || link.target === activeFocusNode.id);

        const isLinkDimmed = activeFocusNode && !isLinkConnected;

        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);

        if (isLinkConnected) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([]);
        } else if (isLinkDimmed) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.lineWidth = 0.8;
          ctx.setLineDash([]);
        } else {
          if (link.type === 'critiqued') {
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.45)';
            ctx.lineWidth = 1.2;
            ctx.setLineDash([4, 4]);
          } else if (link.type === 'echoes') {
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([]);
          } else {
            ctx.strokeStyle = 'rgba(245, 158, 11, 0.28)';
            ctx.lineWidth = 1.0;
            ctx.setLineDash([]);
          }
        }

        ctx.stroke();
        ctx.setLineDash([]);

        // 连线标签 (仅在高亮或正常且缩放较高时显示)
        if (link.label && (isLinkConnected || zoom >= 1.1)) {
          const midX = (sourceNode.x + targetNode.x) / 2;
          const midY = (sourceNode.y + targetNode.y) / 2;
          ctx.fillStyle = isLinkConnected ? '#fbbf24' : 'rgba(161, 161, 170, 0.7)';
          ctx.font = isLinkConnected ? 'bold 10px sans-serif' : '9px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(link.label, midX, midY - 3);
        }
      });

      // 绘制节点 (Nodes)
      nodes.forEach(node => {
        const isHovered = activeFocusNode?.id === node.id;
        const isConnected = connectedNodeIds ? connectedNodeIds.has(node.id) : true;
        const isCategoryMatch = filterType === 'all' || node.type === filterType;
        const isSearchMatch =
          !searchQuery.trim() ||
          node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (node.description && node.description.toLowerCase().includes(searchQuery.toLowerCase()));

        // 透明度考量
        let opacity = 1.0;
        if (activeFocusNode) {
          opacity = isConnected ? 1.0 : 0.18;
        }
        if (!isCategoryMatch || !isSearchMatch) {
          opacity = Math.min(opacity, 0.12);
        }

        ctx.globalAlpha = opacity;
        const radius = isHovered ? node.val / 2 + 5 : node.val / 2;

        // 节点外围发光光晕
        if (isHovered || (activeFocusNode && isConnected && isCategoryMatch)) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = node.color ? `${node.color}33` : 'rgba(245, 158, 11, 0.25)';
          ctx.fill();
        }

        // 节点实体圆环
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color || '#e5b869';
        ctx.fill();

        ctx.strokeStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.6)';
        ctx.lineWidth = isHovered ? 2.5 : 1.2;
        ctx.stroke();

        // 节点名称文字
        ctx.fillStyle = isHovered ? '#ffffff' : '#e4e4e7';
        ctx.font = isHovered ? 'bold 12px "Noto Serif SC", serif' : '11px "Noto Serif SC", serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, node.x, node.y + radius + 13);
      });

      ctx.globalAlpha = 1.0;
      ctx.restore();
      ctx.restore();

      animationFrameRef.current = requestAnimationFrame(runFrame);
    };

    animationFrameRef.current = requestAnimationFrame(runFrame);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [pan, zoom, activeFocusNode, connectedNodeIds, filterType, searchQuery]);

  // 坐标换算辅助函数 (鼠标坐标 -> 虚拟世界坐标)
  const getWorldCoord = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    return {
      x: (mouseX - pan.x) / zoom,
      y: (mouseY - pan.y) / zoom
    };
  };

  // 鼠标移动
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x: worldX, y: worldY } = getWorldCoord(e);

    // 正在拖拽具体节点
    if (draggedNodeRef.current) {
      draggedNodeRef.current.x = worldX;
      draggedNodeRef.current.y = worldY;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
      simulationAlphaRef.current = 0.5; // 唤醒物理引擎
      return;
    }

    // 正在拖拽画布平移
    if (isPanningRef.current) {
      setPan({
        x: pan.x + (e.clientX - panStartRef.current.x),
        y: pan.y + (e.clientY - panStartRef.current.y)
      });
      panStartRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // 悬停命中测试
    const found = nodesRef.current.find(node => {
      const dx = node.x - worldX;
      const dy = node.y - worldY;
      return Math.sqrt(dx * dx + dy * dy) < node.val / 2 + 8;
    });

    setHoveredNode(found || null);
  };

  // 鼠标按下
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x: worldX, y: worldY } = getWorldCoord(e);

    const hit = nodesRef.current.find(node => {
      const dx = node.x - worldX;
      const dy = node.y - worldY;
      return Math.sqrt(dx * dx + dy * dy) < node.val / 2 + 8;
    });

    if (hit) {
      draggedNodeRef.current = hit;
      hit.isDragging = true;
      setSelectedNode(hit);
    } else {
      isPanningRef.current = true;
      panStartRef.current = { x: e.clientX, y: e.clientY };
      setSelectedNode(null);
    }
  };

  // 鼠标抬起
  const handleMouseUp = () => {
    if (draggedNodeRef.current) {
      draggedNodeRef.current.isDragging = false;
      draggedNodeRef.current = null;
    }
    isPanningRef.current = false;
  };

  // 鼠标滚轮缩放 (以鼠标位置为锚点平滑缩放)
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const zoomDelta = e.deltaY < 0 ? 1.15 : 0.87;
    const newZoom = Math.min(Math.max(zoom * zoomDelta, 0.4), 3.0);

    // 缩放聚焦于鼠标点
    const newPanX = mouseX - (mouseX - pan.x) * (newZoom / zoom);
    const newPanY = mouseY - (mouseY - pan.y) * (newZoom / zoom);

    setZoom(newZoom);
    setPan({ x: newPanX, y: newPanY });
  };

  // 双击或点击穿透节点档案
  const handleNodeInspect = (node: SimNode) => {
    if (node.type === 'philosopher') {
      openPhilosopherById(node.id);
    } else if (node.type === 'echo') {
      const targetEchoId = node.echoId || node.id.replace('echo-', '');
      openCulturalEchoById(targetEchoId);
    }
  };

  // 搜索定位并平移至目标节点
  const handleLocateNode = (node: SimNode) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    setSelectedNode(node);
    setZoom(1.4);
    setPan({
      x: cx - node.x * 1.4,
      y: cy - node.y * 1.4
    });
    simulationAlphaRef.current = 0.5;
  };

  return (
    <div className="h-full flex flex-col overflow-hidden gap-2 animate-fade-in select-none">
      {/* 顶部控制栏 (Header Controls Bar) */}
      <div className="liquid-glass-card rounded-2xl px-4 py-2.5 border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 shadow-lg">
        {/* 标题与简介 */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${activeEra.accentColor}33, #09090b)`
            }}
          >
            <Share2 className="w-4 h-4" style={{ color: activeEra.accentColor }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs sm:text-sm font-bold font-serif text-white tracking-wide">
                思想星图网络 (Knowledge Constellation)
              </h2>
              <span className="text-[10px] font-mono text-zinc-500">
                {GRAPH_NODES.length} 核心节点 · {GRAPH_LINKS.length} 思想谱系
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 font-serif hidden md:block">
              可按住节点自由拖拽重组、滚轮缩放探微；悬停节点将高亮所有传承与论敌连线。
            </p>
          </div>
        </div>

        {/* 分类过滤器 & 搜索与视口控制组 */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {/* 类型筛选胶囊 */}
          <div className="flex items-center p-0.5 rounded-xl bg-black/40 border border-white/[0.08] text-[11px] font-mono">
            {[
              { id: 'all', label: '全部' },
              { id: 'philosopher', label: '先哲' },
              { id: 'school', label: '流派' },
              { id: 'concept', label: '概念' },
              { id: 'echo', label: '回响' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  filterType === tab.id
                    ? 'bg-amber-500/25 text-amber-300 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 快捷搜索框 */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="搜索先哲/流派..."
              className="w-28 sm:w-36 bg-black/50 border border-white/10 rounded-xl px-2.5 py-1 pl-7 text-[11px] text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/60 transition-all font-serif"
            />
            <Search className="w-3 h-3 text-zinc-500 absolute left-2.5 top-2" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1.5 text-zinc-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* 缩放与视角复位 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom(prev => Math.min(prev * 1.25, 3.0))}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-all"
              title="放大 (也可使用滚轮)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.max(prev * 0.8, 0.4))}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-all"
              title="缩小 (也可使用滚轮)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setZoom(1);
                setPan({ x: 0, y: 0 });
                setSelectedNode(null);
                simulationAlphaRef.current = 0.8;
              }}
              className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-all"
              title="重置视角与星云"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 星系画布视口 (Canvas Galaxy Viewport) */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 relative rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing bg-[#06070a]"
      >
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onClick={() => {
            if (hoveredNode) handleNodeInspect(hoveredNode);
          }}
          className="w-full h-full block"
        />

        {/* 悬停或选中节点情报卡 (Floating Inspector Card) */}
        {activeFocusNode && (
          <div className="absolute bottom-5 left-5 p-4 rounded-2xl bg-zinc-950/90 border border-amber-500/40 backdrop-blur-xl shadow-2xl max-w-sm flex flex-col gap-2 animate-fade-in pointer-events-auto">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: activeFocusNode.color || '#f59e0b' }}
                />
                <h4 className="text-sm font-bold font-serif text-white">
                  {activeFocusNode.name}
                </h4>
              </div>

              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-amber-300 font-mono uppercase">
                {activeFocusNode.type === 'philosopher' && '先哲人物'}
                {activeFocusNode.type === 'school' && '核心流派'}
                {activeFocusNode.type === 'concept' && '思想概念'}
                {activeFocusNode.type === 'echo' && '文化回响'}
              </span>
            </div>

            {activeFocusNode.description && (
              <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                {activeFocusNode.description}
              </p>
            )}

            {/* 关联数量与穿透跳转 */}
            <div className="flex items-center justify-between pt-1 border-t border-white/[0.08] text-[11px]">
              <span className="text-zinc-500 font-mono">
                关联思想连线: {connectedNodeIds ? connectedNodeIds.size - 1 : 0} 条
              </span>

              {(activeFocusNode.type === 'philosopher' || activeFocusNode.type === 'echo') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeInspect(activeFocusNode);
                  }}
                  className="text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 transition-colors"
                >
                  <span>查看生平/文化档案</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* 底部图例说明 */}
        <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md hidden lg:flex items-center gap-4 text-[11px] font-mono text-zinc-400 pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>先哲人物</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span>核心流派</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            <span>思想概念</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>文化回响</span>
          </div>
        </div>
      </div>
    </div>
  );
};
