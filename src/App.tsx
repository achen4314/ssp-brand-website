import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import ParticleUniverse from './components/scenes/ParticleUniverse';
import DataNetwork from './components/scenes/DataNetwork';
import TerrainLandscape from './components/scenes/TerrainLandscape';
import LightOrbs from './components/scenes/LightOrbs';
import FogFluid from './components/scenes/FogFluid';
import GlowOrbs from './components/GlowOrbs';
import LensFlare from './components/LensFlare';
import CinematicOverlays from './components/CinematicOverlays';
import Navbar from './components/Navbar';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // GSAP ScrollTrigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── S1 HERO exit ──
      gsap.timeline({
        scrollTrigger: {
          trigger: '#s1-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      })
        .fromTo('#s1-label', { opacity: 1, y: 0 }, { opacity: 0, y: -60 }, 0)
        .fromTo('#s1-title', { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.95 }, 0.1)
        .fromTo('#s1-body', { opacity: 1, y: 0 }, { opacity: 0, y: -30 }, 0.2)
        .fromTo('#s1-stats', { opacity: 1, y: 0 }, { opacity: 0, y: -20 }, 0.3);

      // ── S2 PHILOSOPHY entrance ──
      gsap.fromTo('#s2-label',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s2-philosophy', start: 'top 55%', end: 'top 25%', scrub: 1 },
        }
      );
      gsap.fromTo('#s2-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s2-philosophy', start: 'top 50%', end: 'top 20%', scrub: 1 },
        }
      );
      gsap.fromTo('#s2-body',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s2-philosophy', start: 'top 45%', end: 'top 15%', scrub: 1 },
        }
      );
      gsap.fromTo('#s2-timeline > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          stagger: 0.12,
          scrollTrigger: { trigger: '#s2-philosophy', start: 'top 35%', end: 'top 5%', scrub: 1 },
        }
      );

      // ── S3 SERVICE entrance ──
      gsap.fromTo('#s3-label',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s3-service', start: 'top 55%', end: 'top 25%', scrub: 1 },
        }
      );
      gsap.fromTo('#s3-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s3-service', start: 'top 50%', end: 'top 20%', scrub: 1 },
        }
      );
      gsap.fromTo('#s3-cards > *',
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.12,
          scrollTrigger: { trigger: '#s3-service', start: 'top 40%', end: 'top 10%', scrub: 1 },
        }
      );

      // ── S4 PLATFORM entrance ──
      gsap.fromTo('#s4-label',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s4-platform', start: 'top 55%', end: 'top 25%', scrub: 1 },
        }
      );
      gsap.fromTo('#s4-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s4-platform', start: 'top 50%', end: 'top 20%', scrub: 1 },
        }
      );
      gsap.fromTo('#s4-body',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s4-platform', start: 'top 45%', end: 'top 15%', scrub: 1 },
        }
      );
      gsap.fromTo('#s4-stats > *',
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          stagger: 0.15,
          scrollTrigger: { trigger: '#s4-platform', start: 'top 35%', end: 'top 5%', scrub: 1 },
        }
      );

      // ── S5 CTA entrance ──
      gsap.fromTo('#s5-label',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s5-contact', start: 'top 60%', end: 'top 30%', scrub: 1 },
        }
      );
      gsap.fromTo('#s5-title',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1,
          scrollTrigger: { trigger: '#s5-contact', start: 'top 55%', end: 'top 25%', scrub: 1 },
        }
      );
      gsap.fromTo('#s5-body',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s5-contact', start: 'top 50%', end: 'top 20%', scrub: 1 },
        }
      );
      gsap.fromTo('#s5-cta',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          scrollTrigger: { trigger: '#s5-contact', start: 'top 45%', end: 'top 15%', scrub: 1 },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    { title: '生物力学视频分析', desc: '高速摄像捕捉运动模式，量化关节角度、发力时序与不对称性，精准定位技术缺陷。' },
    { title: '力板数据深度解读', desc: 'CMJ/SJ/DJ 跳跃力学、RFD 发力率、落地动力学——用物理公式翻译每一次起跳。' },
    { title: '周期化训练方案', desc: '基于评估数据制定 4-16 周个性化周期计划，DUP / Block / 线性周期按需选择。' },
    { title: '运动营养规划', desc: '训练周期匹配营养周期，从基础代谢到赛前充碳，数据驱动的身体燃料管理。' },
    { title: '损伤风险管理', desc: '不对称筛查 + 负荷监控 + 动作模式评估，在伤前发现风险，而非伤后亡羊补牢。' },
  ];

  return (
    <div ref={containerRef}>
      {/* Fixed overlays */}
      <CinematicOverlays />
      <GlowOrbs />
      <LensFlare />
      <Navbar />

      {/* ═══════════ S1 · HERO ═══════════ */}
      <section id="s1-hero" className="section-screen">
        <ParticleUniverse />
        <div className="gradient-wipe gradient-wipe--bottom" />
        <div className="color-grade color-grade--teal" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div id="s1-label" className="label mb-8">SteelBull Sport Performance</div>
          <h1 id="s1-title" className="display-hero text-white max-w-5xl">
            科学与实战的<span className="text-gradient">桥梁</span>
          </h1>
          <p id="s1-body" className="body-xl max-w-xl mt-8">
            从生物力学评估到周期化训练，以数据驱动每一位运动员的表现突破。
            不是经验主义，是循证科学。
          </p>
          <div id="s1-stats" className="stats-row">
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">核心服务模块</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">运动员服务经验</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">AI</span>
              <span className="stat-label">智能训练引擎</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S2 · PHILOSOPHY ═══════════ */}
      <section id="s2-philosophy" className="section-screen">
        <DataNetwork />
        <div className="gradient-wipe gradient-wipe--top" />
        <div className="gradient-wipe gradient-wipe--bottom" />
        <div className="color-grade color-grade--green" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div id="s2-label" className="label mb-8">训练哲学</div>
          <h2 id="s2-title" className="display-xl text-white max-w-4xl">
            科学训练<span className="text-gradient">闭环</span>
          </h2>
          <p id="s2-body" className="body-xl max-w-xl mt-8">
            真正的科学训练不是"感觉对了就加重量"。它是测试、分析、规划、执行、监控、复测的完整循环。
            每一步都有数据支撑，每一个决策都有理由。
          </p>
          <div id="s2-timeline" className="timeline mt-10 max-w-3xl">
            {['测试评估', '数据分析', '方案制定', '训练执行', '进度监控', '周期复测'].map((step, i) => (
              <div className="timeline-step" key={i}>
                <div className="timeline-dot" />
                <span className="timeline-label">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S3 · SERVICE ═══════════ */}
      <section id="s3-service" className="section-screen">
        <TerrainLandscape />
        <div className="gradient-wipe gradient-wipe--top" />
        <div className="gradient-wipe gradient-wipe--bottom" />
        <div className="color-grade color-grade--teal" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div id="s3-label" className="label mb-8">核心服务</div>
          <h2 id="s3-title" className="display-xl text-white max-w-4xl">
            覆盖运动表现的<span className="text-gradient">每一个维度</span>
          </h2>
          <div id="s3-cards" className="service-grid max-w-5xl">
            {services.map((svc, i) => (
              <div className="glass service-card" key={i}>
                <div className="service-card-icon">
                  {['🔬', '📊', '📋', '🥗', '🛡️'][i]}
                </div>
                <h3 className="service-card-title">{svc.title}</h3>
                <p className="service-card-desc">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ S4 · PLATFORM ═══════════ */}
      <section id="s4-platform" className="section-screen">
        <LightOrbs />
        <div className="gradient-wipe gradient-wipe--top" />
        <div className="gradient-wipe gradient-wipe--bottom" />
        <div className="color-grade color-grade--green" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full">
          <div id="s4-label" className="label mb-8">智能平台</div>
          <h2 id="s4-title" className="display-xl text-white max-w-4xl">
            SSP COACH <span className="text-gradient">PRO</span>
          </h2>
          <p id="s4-body" className="body-xl max-w-xl mt-8">
            AI 驱动的教练决策平台。管理运动员数据、追踪训练进度、分析人群趋势、生成个性化方案——
            让每一位教练都拥有数据科学家的能力。
          </p>
          <div id="s4-stats" className="stats-row">
            <div className="stat-item">
              <span className="stat-number">33+</span>
              <span className="stat-label">API 服务端点</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">7</span>
              <span className="stat-label">功能模块页面</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">DeepSeek</span>
              <span className="stat-label">AI 引擎驱动</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">云端可用</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ S5 · CTA ═══════════ */}
      <section id="s5-contact" className="section-screen">
        <FogFluid />
        <div className="gradient-wipe gradient-wipe--top" />
        <div className="color-grade color-grade--teal" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 w-full text-center">
          <div id="s5-label" className="label mb-8">开始合作</div>
          <h2 id="s5-title" className="display-xl text-white max-w-4xl mx-auto">
            让科学成为你的<span className="text-gradient">优势</span>
          </h2>
          <p id="s5-body" className="body-xl max-w-lg mx-auto mt-8">
            无论你是追求突破的运动员，还是想提升决策水平的教练——
            SSP 为你提供从评估到训练的全链路科学支持。
          </p>
          <div id="s5-cta" className="mt-10 flex justify-center gap-4">
            <a href="https://ssp-coach-pro.onrender.com" target="_blank" rel="noopener noreferrer" className="btn-primary">
              进入 SSP COACH PRO →
            </a>
          </div>
          <p className="body-lg mt-12" style={{ color: 'var(--text-muted)' }}>
            © 2026 SteelBull Sport Performance · 铁牛运动表现
          </p>
        </div>
      </section>
    </div>
  );
}
