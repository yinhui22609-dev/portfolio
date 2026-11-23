import { CaseImage, CaseIntro, CaseSection, PendingMaterial } from "./case-primitives";
import { ProductFramework } from "./product-framework";
import { keystoneJourney, keystoneValidation } from "@/lib/keystone-process";
import { assetPath } from "@/lib/asset-path";
import styles from "./keystone-case.module.css";

const base = "/images/projects/keystone/";
const pipeline = [
  ["限定资料", "用户选择文档版本与原文范围"],
  ["检索依据", "检索片段保留文件、页码与位置"],
  ["生成主张", "在给定证据范围内回答或分析"],
  ["核对引用", "程序匹配原文位置，再复核主张与证据"],
  ["人工确认", "判断缺口、冲突与分析维度"],
  ["保存交付", "保留版本，整理研究简报与来源"],
];

export function KeystoneCase() {
  return <article className={styles.case} aria-labelledby="project-heading">
    <header className={styles.hero}>
      <div className={styles.identity}><span className={styles.monogram}>K</span><span>KEYSTONE<br /><small>AI RESEARCH COPILOT</small></span><span className={styles.progress}>PERSONAL PROJECT / 迭代中</span></div>
      <div className={styles.heroIntro}><CaseIntro kicker="KEYSTONE / AI PRODUCT DESIGN" title="AI多文档研究助手" summary="让 AI 研究，从信息检索走向有据可查。">
        <p className={styles.heroDescription}>从研究需求出发，设计可控制、可回查、可交付的 AI 工作流，连接资料管理、研究问答、对比分析与引用核验。</p>
        <p className={styles.ownerNote}>AI 产品负责人（个人项目） · AI 工作流设计<br />负责需求收敛、产品规划、交互方案与迭代验收，借助 Codex 推进实现。</p>
        <ul className={styles.heroHighlights} aria-label="产品设计主线"><li>资料管理</li><li>研究问答</li><li>对比分析</li><li>引用核验</li></ul>
      </CaseIntro></div>
      <div className={styles.heroStage}>
        <div className={styles.workspace}><CaseImage src={base + "research-workspace-clear.png"} alt="Keystone 真实清晰工作台，包含资料侧栏、研究问答、资料库、研究分析表与研究简报导航" width={1919} height={814} priority caption="新提供的真实工作台截图 · 完整保留原始界面，可放大查看" sizes="(max-width: 639px) 94vw, (max-width: 1023px) 88vw, 72vw" /></div>
        <div className={styles.heroAside}><span>THE PRODUCT QUESTION</span><h2>如何让答案，<br />成为可用的研究？</h2><p>重点不止生成文本，而是把资料范围、证据、人工判断与最终交付连接起来。</p><div><span>当前阶段</span><strong>本地核心流程已验证<br />公网发布准备中</strong></div></div>
      </div>
    </header>

    <ProductFramework label="PRODUCT STRATEGY / DECISIONS" title="从问题，到产品取舍" summary="从真实需求文档与制作记录中梳理三条主线：研究任务优先、证据先于结论、阶段交付可验收。" rows={[
      { problem: "资料多、口径不同，研究需要逐份整理。", decision: "以项目为单位管理资料；分析按对象和维度组织，避免只返回一段泛化摘要。", evidence: "需求研究中的 JTBD、V1 PRD、研究分析表及其版本。"},
      { problem: "回答看似完整，仍难判断是否有依据。", decision: "把结论、引用和原文位置作为同一条证据链；资料不足或冲突显式保留。", evidence: "引用抽屉、原文范围约束、冲突与资料不足测试。"},
      { problem: "能生成内容，不代表能完成研究交付。", decision: "从问答延伸至分析、简报和导出，并分别定义验收条件。", evidence: "正式导出样本、中文 PDF 分页修复、阶段验收记录。"},
    ]} validation="需求研究以桌面分析形成假设，用户访谈尚待补充；本地接口与有限样本验证不等同于公网发布或用户价值已经得到量化证明。" />

    <CaseSection id="keystone-product-framework" eyebrow="PRODUCT FRAMEWORK / 0 → 1" title="把研究任务，组织成产品框架">
      <p className={styles.frameworkLead}>从用户目标，到核心业务流程，再到功能模块与底层支撑。下图为新提供的产品框架原图，用于说明产品设计范围；图中的价值是设计目标，各项实现与验收状态仍以分阶段记录为准。</p>
      <CaseImage className={styles.frameworkImage} src={base + "research-workbench-framework.png"} alt="Keystone AI研究工作台产品框架图：用户目标、核心业务流程、功能模块、底层支撑与产品价值" width={1448} height={1086} caption="用户提供的原始产品框架图 · 不裁切，可打开原图核对" sizes="(max-width: 639px) 90vw, (max-width: 1023px) 86vw, 900px" />
      <dl className={styles.frameworkSummary}><div><dt>用户目标</dt><dd>上传自己的资料，完成研究分析，形成可引用的研究结论。</dd></div><div><dt>业务闭环</dt><dd>新建项目、上传与解析、问答、分析表、简报、导出。</dd></div><div><dt>功能支撑</dt><dd>原文依据、历史与版本、引用校验、访客隔离和预算保护。</dd></div></dl>
    </CaseSection>

    <CaseSection id="keystone-zero-to-one" eyebrow="01 / FROM 0 TO 1" title="把制作过程，拆成七个产品阶段">
      <p className={styles.lead}>每一步都回答一个产品问题，再落到具体交付与验收。以下路径依据实际需求研究、PRD、开发清单及 Codex 阶段记录整理。</p>
      <ol className={styles.journey}>{keystoneJourney.map(step => <li key={step.stage}>
        <span className={styles.stageNumber}>{step.stage}</span><div className={styles.stageBody}><h3>{step.title}</h3><p className={styles.stageQuestion}>{step.question}</p><p>{step.decision}</p><dl><div><dt>阶段产出</dt><dd>{step.output}</dd></div><div><dt>保留边界</dt><dd>{step.boundary}</dd></div></dl></div>
      </li>)}</ol>
    </CaseSection>

    <CaseSection id="keystone-ai-workflow" eyebrow="02 / AI WORKFLOW DESIGN" title="设计一条可回查的证据链">
      <p className={styles.note}>模型负责理解与生成，程序负责范围、结构和原文位置，用户保留确认权。三者分工，降低黑盒研究带来的不确定性。</p>
      <ol className={styles.pipeline}>{pipeline.map(([title, text], index) => <li key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      <div className={styles.failurePath}><strong>没有足够依据时</strong><span>无命中 / 缺失 / 冲突 → 保留提示与来源 → 补充资料或调整问题</span></div>
      <div className={styles.responsibilities}>
        <div><span>AI</span><h3>提出与生成</h3><p>理解问题、建议分析维度、基于给定原文生成主张与分析。</p></div>
        <div><span>PROGRAM</span><h3>约束与校验</h3><p>文件解析、范围筛选、结构校验、引文匹配、版本保存和预算门禁。</p></div>
        <div><span>HUMAN</span><h3>选择与判断</h3><p>确定目标、确认资料和维度、检查冲突与缺口，决定成果是否可用。</p></div>
      </div>
    </CaseSection>

    <CaseSection id="keystone-iteration" eyebrow="03 / ITERATION & TRADE-OFFS" title="从反馈中，修正工作流">
      <div className={styles.iterationList}>
        <div><h3>研究范围需要可见</h3><p>把“查原文—选中依据—进入研究分析”连成路径，避免用户选过的资料在跨模块后丢失。</p><span>交付：选中范围约束与研究联动</span></div>
        <div><h3>研究过程需要可恢复</h3><p>将对话与原文检索从临时页面状态改为持久记录，刷新后继续研究，并保留出处和历史版本。</p><span>交付：对话持久化与刷新恢复</span></div>
        <div><h3>导出是产品交付的一部分</h3><p>根据验收修正中文 PDF 的引用跨页、长文件名换行和标题孤字；不靠删掉引用解决版面问题。</p><span>交付：正式 PDF 与分页复验</span></div>
      </div>
    </CaseSection>

    <CaseSection id="keystone-validation" eyebrow="04 / VALIDATION" title="检查 AI 返回，也检查不该返回什么">
      <p className={styles.note}>2026 年 11 月 22 日，在隔离测试资料上完成 10 次真实模型请求，覆盖以下路径。记录用于验证工作流与失败处理，不作为准确率或用户规模指标。</p>
      <div className={styles.testTable}><table><caption className="sr-only">有限样本真实模型验收</caption><thead><tr><th>验证任务</th><th>请求数</th><th>观察与检查</th></tr></thead><tbody>{keystoneValidation.map(row => <tr key={row.task}><th scope="row">{row.task}</th><td>{row.calls}</td><td>{row.result}</td></tr>)}</tbody></table></div>
      <p className={styles.validationLimit}>仍需继续验证：规划与支持度复核对证据充分性的判断、Word 导出的人工视觉检查，以及公网环境下的完整工作流。有限样本通过不代表模型核验始终正确，也不代表产品全部完成。</p>
    </CaseSection>

    <CaseSection id="keystone-output" eyebrow="05 / DELIVERY" title="让研究结果，形成正式交付">
      <div className={styles.outputGrid}>
        <CaseImage src={base + "brief-page-1.png"} alt="Keystone 真实研究简报第1页，包含结论与编号来源" width={849} height={1200} caption="已有正式导出样本 · 完整第1页" sizes="(max-width: 639px) 90vw, 45vw" />
        <div className={styles.outputCopy}><span>FROM EVIDENCE TO DELIVERABLE</span><h3>保留结论，<br />也保留来路。</h3><p>简报承接研究问题、结论与来源，让结果能继续编辑、核对和交付。现有文件展示真实输出，不补造新的产品界面。</p><ul><li>目标：让回答进入后续分析与交付</li><li>方案：统一研究内容、来源与版本关系</li><li>验收：检查导出结构、中文排版与引用对应</li></ul><a href={assetPath(base + "research-brief.pdf")} target="_blank" rel="noreferrer">查看原始导出样本 ↗ <small>PDF · 已提供版本</small></a></div>
      </div>
    </CaseSection>

    <CaseSection id="keystone-artifacts" eyebrow="06 / PROCESS MATERIALS" title="制作依据与后续迭代">
      <div className={styles.artifactLinks}><a href={assetPath(base + "product-requirements.pdf")} target="_blank" rel="noreferrer">产品需求文档 ↗<span>定位、流程、能力边界与阶段范围</span></a><div><strong>实际制作记录</strong><span>需求研究 → 竞品分析 → PRD → 分阶段开发 → 功能整合 → AI 验证 → 发布准备</span></div></div>
      <details className={styles.archive}><summary>查看界面材料与后续补充项</summary><div className={styles.pendingGrid}><PendingMaterial title="更完整的过程界面" note="后续补充资料库、研究分析表、原文核验与结果编辑的清晰真实截图；现有工作台已在封面展示。" /><PendingMaterial title="用户价值验证" note="继续补充目标用户访谈、真实研究任务与可用性观察，不以接口测试替代用户验证。" /></div></details>
    </CaseSection>

    <section className={styles.conclusion} aria-labelledby="keystone-conclusion"><span>CURRENT STATE / NEXT STEP</span><h2 id="keystone-conclusion">从可运行的闭环，走向可公开使用的产品。</h2><p>个人项目已积累本地核心流程与阶段验收证据，公网版本仍处于发布准备阶段。开放前还需验证云端工作流、访客隔离与失败恢复，完成数据自动清理及完整删除能力，并补齐 Word 导出的人工视觉检查。</p></section>
  </article>;
}
