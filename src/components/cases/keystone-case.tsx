import type { ReactNode } from "react";
import { CaseImage } from "./case-primitives";
import { keystoneCalls, keystoneDecisions, keystoneFlow, keystoneProblems, keystonePublicEvidence, keystoneTimeline, keystoneTokens } from "@/lib/keystone-process";
import styles from "./keystone-case.module.css";

const chapters = [["overview", "项目概览"], ["problem", "问题定义"], ["solution", "核心方案"], ["decisions", "设计决策"], ["validation", "真实验证"], ["reflection", "贡献与复盘"]] as const;
const totalTokens = keystoneTokens.reduce((sum, item) => sum + item.value, 0);

function Section({ id, number, english, title, children }: { id: string; number: string; english: string; title: string; children: ReactNode }) {
  return <section id={"keystone-" + id} data-keystone-section={id} className={styles.section} aria-labelledby={"keystone-" + id + "-heading"}>
    <div className={styles.heading}><span className={styles.sectionNo} aria-hidden="true">{number}</span><div><p className={styles.eyebrow}>{english}</p><h2 id={"keystone-" + id + "-heading"}>{title}</h2></div></div>{children}
  </section>;
}

function Source({ children }: { children: ReactNode }) {
  return <a className={styles.sourceLink} href="#keystone-sources">{children} ↗</a>;
}

function FlowSymbol({ index }: { index: number }) {
  const paths = [
    "M12 16V3m-4 4 4-4 4 4M4 15v6h16v-6",
    "M4 4h11v5M4 4v16h8m-4-9h4m-4 4h2M18 17l4 4m-1-9a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z",
    "M4 4h16v13H9l-5 4V4Zm4 5h8m-8 4h5",
    "M4 4h16v16H4V4Zm0 5h16M9 4v16m5-11v11",
    "M12 3 3 7v6c0 4 9 8 9 8s9-4 9-8V7l-9-4Zm-4 9 3 3 5-6",
    "M5 3h10l4 4v14H5V3Zm10 0v5h4M8 12h8m-8 4h8",
  ];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[index]} /></svg>;
}

export function KeystoneCase() {
  return <article className={styles.case} data-keystone-case-study aria-labelledby="project-heading">
    <header className={styles.hero} id="keystone-overview" data-keystone-section="overview">
      <div className={styles.heroTop}><div className={styles.brand}><span className={styles.logo} aria-hidden="true">K</span><span>KEYSTONE<small>AI PRODUCT CASE STUDY</small></span></div><span className={styles.status}>AI 产品负责人 · 个人项目<br />本地阶段验证 / 公网尚未开放</span></div>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}><p className={styles.eyebrow}>01 / WHAT I BUILT</p><h1 id="project-heading" className={styles.heroTitle}>Keystone<br /><span>AI 研究工作台</span></h1><p className={styles.heroLead}>把多文档问答，变成有依据、可回查、能复用的研究成果。</p><p className={styles.role}>我负责问题定义、AI 工作流、交互与验收，<br />借助 Codex 推进从方案到本地闭环。</p></div>
        <div className={styles.heroVisual}><div className={styles.device}><div className={styles.deviceBar} aria-hidden="true"><span /><span /><span /></div><CaseImage src="/images/projects/keystone/research-workspace-clear.png" alt="Keystone 真实研究工作台，包含研究问答、资料库、研究分析与简报入口" width={1919} height={814} priority sizes="(max-width:639px) 88vw, (max-width:1023px) 48vw, 600px" /></div><div className={styles.deviceBase} aria-hidden="true" /><p>真实产品界面 · 点击放大，不代表公网已上线</p></div>
      </div>
      <div className={styles.metrics} aria-label="三项有来源的阶段成果">
        <div className={styles.metric}><span className={styles.metricValue}>10 次</span><span className={styles.metricLabel}>真实 DeepSeek 请求</span><span className={styles.metricNote}>含生成、规划与复核；隔离测试资料</span></div>
        <div className={styles.metric}><span className={styles.metricValue}>19 处</span><span className={styles.metricLabel}>分析样本引用位置核对</span><span className={styles.metricNote}>来自 10 条结论，不是独立来源数</span></div>
        <div className={styles.metric}><span className={styles.metricValue}>59 / 59</span><span className={styles.metricLabel}>旧成功问答幂等恢复</span><span className={styles.metricNote}>历史快照，不是新增调用或用户数</span></div>
      </div>
    </header>
    <nav className={styles.chapterNav} aria-label="Keystone 案例章节">{chapters.map(([id, label], index) => <a href={"#keystone-" + id} key={id}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</nav>

    <Section id="problem" number="02" english="WHY KEYSTONE" title="先定义研究问题，再决定产品形态。">
      <p className={styles.sectionIntro}>方向来自个人研究过程、产品反馈与验收失败记录，不是虚构的用户访谈。</p>
      <div className={styles.problemMap} aria-label="问题、判断与设计目标的逻辑图"><div className={styles.mapHeader} aria-hidden="true"><span>观察到的问题</span><span>我的判断</span><span>设计目标</span></div>{keystoneProblems.map(item => <div className={styles.problemRow} key={item.problem}><div className={styles.problemCell}><strong>{item.problem}</strong><p>{item.detail}</p></div><div className={styles.judgmentCell}><strong>{item.judgment}</strong><p>{item.reason}</p></div><div className={styles.goalCell}><strong>{item.goal}</strong><p>{item.output}</p></div></div>)}</div>
      <p className={styles.footnote}>优先级：先保证证据与范围，再补过程恢复和成果交付；真实用户价值仍待验证。<Source>E01–04</Source></p>
    </Section>

    <Section id="solution" number="03" english="PRODUCT STRATEGY & AI WORKFLOW" title="设计的不是聊天界面，而是一条证据工作流。">
      <ol className={styles.flow} aria-label="六步研究业务链路">{keystoneFlow.map((item, index) => <li className={styles.flowStep} key={item.title}><span className={styles.flowIcon}><FlowSymbol index={index} /></span><span className={styles.flowActor}>{item.actor}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>
      <div className={styles.workflow} aria-label="人工、程序与DeepSeek的协作图">
        <div className={styles.workflowRow}><strong className={styles.workflowLabel}>用户决策<small>保留采信权</small></strong><div className={styles.workflowItems}><span className={styles.workflowItem}>选择资料与片段</span><span className={styles.workflowItem}>确认对象与维度</span><span className={styles.workflowItem}>逐项查看 → 保存版本</span></div></div>
        <div className={styles.workflowRow}><strong className={styles.workflowLabel}>程序约束<small>确定性任务</small></strong><div className={styles.workflowItems}><span className={styles.workflowItem}>关键词召回 / 范围归属</span><span className={styles.workflowItem}>结构与原文位置校验</span><span className={styles.workflowItem}>状态、版本与费用记录</span></div></div>
        <div className={styles.workflowRow}><strong className={styles.workflowLabel}>DeepSeek<small>真实模型任务</small></strong><div className={styles.workflowItems}><span className={styles.workflowItem}>基于原文回答 / 规划</span><span className={styles.workflowItem}>按对象生成字段结果</span><span className={styles.workflowItem}>主张与引文支持度复核</span></div></div>
      </div>
      <div className={styles.guardrail} aria-label="提示词与质量门禁"><div className={styles.guardrailItem}><strong>输入有边界</strong>问答最多 8 段原文、总计 18,000 字节；每字段限定允许来源。</div><div className={styles.guardrailItem}><strong>输出有结构</strong>主张 + 引用 + 不足状态；不能用常识填满空白。</div><div className={styles.guardrailItem}><strong>证据分层检查</strong>程序核位置，模型复核支持关系，人做最终确认。</div><div className={styles.guardrailItem}><strong>失败不隐身</strong>缺口、冲突和失败分开；记录费用，不自动重试。</div></div>
      <p className={styles.footnote}>关键取舍：关键词检索不是向量检索；同一模型复核不是独立盲评；简报汇编已存结论，没有独立 AI 写作。<Source>E04 / E18</Source></p>
    </Section>

    <Section id="decisions" number="04" english="PRODUCT DECISIONS" title="三次关键调整，让产品判断落在流程里。">
      <div className={styles.decisionList}>{keystoneDecisions.map(item => <article className={styles.decision} key={item.id} data-decision={item.id}><div className={styles.decisionHead}><span className={styles.decisionLetter}>{item.id}</span><h3>{item.title}</h3><small>{item.source}</small></div><div className={styles.compare}><div className={styles.compareBefore}><strong>改进前 · {item.issue}</strong>{item.before.map((step, index) => <span key={step}>{index > 0 ? "→ " : ""}{step}</span>)}</div><div className={styles.compareAfter}><strong>设计决策 · {item.decision}</strong>{item.after.map((step, index) => <span key={step}>{index > 0 ? "→ " : ""}{step}</span>)}</div></div><p className={styles.decisionReason}><strong>根因判断：</strong>{item.cause}</p><p className={styles.decisionResult}><strong>改进结果：</strong>{item.result}</p></article>)}</div>
      <p className={styles.diagramLabel}>以上是依据真实记录整理的数据流对比，不是重绘的产品截图。<Source>E02–04 / E16–17</Source></p>
    </Section>

    <Section id="validation" number="05" english="VALIDATION" title="每个数字，都回答一个具体的验证问题。">
      <p className={styles.sectionIntro}>2026/11/22，隔离副本与虚构资料上的一轮真实模型验收。以下是样本结果，不是生产准确率。</p>
      <div className={styles.validationGrid}>
        <figure className={styles.chart} data-keystone-chart="token" aria-labelledby="keystone-token-title"><h3 className={styles.chartTitle} id="keystone-token-title">调用用了多少 Token？</h3><div className={styles.tokenTrack} aria-hidden="true">{keystoneTokens.map(item => <span key={item.label} className={styles.tokenSegment} style={{ width: item.value / totalTokens * 100 + "%" }} data-value={item.value} />)}</div><ul className={styles.tokenLegend}>{keystoneTokens.map(item => <li key={item.label}><span className={styles.legendDot} aria-hidden="true" />{item.label}<strong>{item.value.toLocaleString("en-US")}</strong></li>)}</ul><figcaption className={styles.chartNote}>输入 11,334 + 输出 2,224，共 13,558 Token。缓存命中也计入输入。</figcaption></figure>
        <figure className={styles.chart} data-keystone-chart="calls" aria-labelledby="keystone-calls-title"><h3 className={styles.chartTitle} id="keystone-calls-title">10 次请求分别做了什么？</h3><div className={styles.batchChart}>{keystoneCalls.map(item => <div className={styles.batchRow} key={item.label}><span>{item.label}</span><div aria-hidden="true"><i style={{ width: item.value / 3 * 100 + "%" }} /></div><strong className={styles.batchCount}>{item.value}</strong></div>)}</div><figcaption className={styles.chartNote}>生成与复核分别计次，不把 10 次请求包装成 10 个用户任务。</figcaption></figure>
        <figure className={styles.chart} data-keystone-chart="finite" aria-labelledby="keystone-finite-title"><h3 className={styles.chartTitle} id="keystone-finite-title">没有依据的格子怎么办？</h3><div className={styles.qualityResult}><div><strong>3</strong><span>有结论</span><span aria-hidden="true"><i data-cell="answered" /><i data-cell="answered" /><i data-cell="answered" /></span></div><div><strong>3</strong><span>资料不足</span><span aria-hidden="true"><i data-cell="insufficient" /><i data-cell="insufficient" /><i data-cell="insufficient" /></span></div></div><p className={styles.chartNote}>3 个对象 × 2 个维度。空缺被保留，不以“全部填满”为目标。</p><figcaption className={styles.chartNote}><strong>10 条分析结论 → 19 处引用</strong><br />逐项核对文档、页码与原文位置；不据此声称语义永远正确。</figcaption></figure>
      </div>
      <div className={styles.cost}><strong>¥0.018351 <small>该轮空闲价估算</small></strong><p>应用按高峰价保守计账 ¥0.036700。两者均为历史估算口径，供应商最终扣费未核实；费用与并发门禁不能代替供应商账单硬上限。</p></div>
      <div className={styles.validationFacts}><div className={styles.fact}><strong>7 类基础格式</strong><span>文字 PDF / DOCX / PPTX / XLSX / UTF-8 TXT / MD / CSV，≤25 MB；无 OCR 保证。</span></div><div className={styles.fact}><strong>20 / 8 / 6 组本地专项</strong><span>分别为安全、预算、研究隔离；套件不相加，不等于公网安全审计。</span></div><div className={styles.fact}><strong>真实与 Mock 分开</strong><span>公网版研究隔离另有 10 次 Mock、0 次真实供应商调用，不与本轮相加。</span></div><div className={styles.fact}><strong>恢复与质量分开</strong><span>59 条是旧问答回填，不能推导新增模型质量、用户数或效率提升。</span></div></div>
      <ol className={styles.timeline} aria-label="真实产品迭代时间线" data-keystone-timeline>{keystoneTimeline.map((item, index) => <li className={styles.timelineItem} key={item.date} data-state={index === keystoneTimeline.length - 1 ? "pending" : "recorded"}><span className={styles.timelineDot} aria-hidden="true" /><time>{item.date}</time><strong>{item.title}</strong><span>{item.note}</span></li>)}</ol>
      <p className={styles.footnote}>时间线均为 2026 年阶段记录；最后一站是准备状态，非上线里程碑。<Source>E05–15</Source></p>
    </Section>

    <Section id="reflection" number="06" english="MY CONTRIBUTION & REFLECTION" title="我的工作，是定义判断与交付的边界。">
      <div className={styles.contribution}><div className={styles.contributionItem}><span>01</span><h3>定义问题与优先级</h3><p>证据、过程恢复和交付优先于功能数量。</p></div><div className={styles.contributionItem}><span>02</span><h3>设计 AI 协作机制</h3><p>限定上下文、结构化输出、缺口与确认门禁。</p></div><div className={styles.contributionItem}><span>03</span><h3>推进实现与迭代</h3><p>借助 Codex 把范围联动、状态与版本落实。</p></div><div className={styles.contributionItem}><span>04</span><h3>建立验证与风险标准</h3><p>分开真实/Mock、位置/语义、估算/实账。</p></div></div>
      <div className={styles.reflection}><div className={styles.reflectionMain}><h3>目前解决到哪里？</h3><p>本地证据链与阶段验收已有记录，真实用户价值仍待验证。截至 2026/11/24，云资源与空库已准备，但 Worker 尚未部署、访问保护未核验，入口关闭。</p><p>自动清理、永久删除和 Word 人工视觉验收仍待完成；匿名空间不是登录账号，清 Cookie 或换浏览器不能自动找回。</p></div><div className={styles.reflectionNext}><h3>下一步，按什么顺序做？</h3><ol><li>先补云端完整流程与数据生命周期，再开放访问。</li><li>扩大冲突、缺口和检索漏召回难例，分别评位置与语义。</li><li>用真实研究任务观察查证、修正与成果复用，再决定自动化投入。</li></ol></div></div>
      <details className={styles.sources} id="keystone-sources"><summary>查看数据来源与验证边界</summary><p className={styles.footnote}>依据已核实的源码、提交与历史验收整理。未重跑产品或调用模型，不公开原始资料、请求响应及私人论文。</p><div className={styles.sourceTable} role="region" aria-label="证据摘要，可横向滚动" tabIndex={0}><table><thead><tr><th>证据</th><th>来源记录</th><th>适用范围</th></tr></thead><tbody>{keystonePublicEvidence.map(item => <tr key={item.id}><th scope="row">{item.id}</th><td>{item.record}</td><td>{item.scope}</td></tr>)}</tbody></table></div></details>
    </Section>
  </article>;
}
