import type { ReactNode } from "react";
import { CaseImage, CaseIntro, CaseSection, PendingMaterial } from "./case-primitives";
import { ProductFramework } from "./product-framework";
import { NianhuaHero } from "./nianhua-hero";
import styles from "./cultural-cases.module.css";

const nianhuaSite = "https://yinhui22609-dev.github.io/mubannianhua-site/";
const liaoningSite = "https://yinhui22609-dev.github.io/ShanHaiLiaoCang/";
const nianhuaImages = "/images/projects/nianhua/";
const liaoningImages = "/images/projects/liaoning/";
const halfSizes = "(max-width: 639px) 90vw, 45vw";
const boardSizes = "(max-width: 639px) 90vw, 30vw";

function VisitSite({ href }: { href: string }) {
  return <a className={styles.visit} href={href} target="_blank" rel="noopener noreferrer">访问真实网站<span>ONLINE WEBSITE</span></a>;
}

function EvidenceDetails({ title, count, children }: { title: string; count: string; children: ReactNode }) {
  return <details className={styles.evidenceDetails}><summary>{title}<span>{count}</span></summary><div className={styles.evidenceContent}>{children}</div></details>;
}

export function NianhuaCase() {
  return (
    <article className={`${styles.case} ${styles.nianhua}`}>
      <NianhuaHero siteUrl={nianhuaSite} />

      <CaseSection id="nianhua-problem" eyebrow="PROBLEM & USER TASKS" title="先建立知识脉络，再让用户动手。">
        <div className={styles.problemGrid}>
          <div><p className={styles.lead}>年画的意义不只在画面，也在地域、工序与传承。项目将资料分散、知识关联不清和参与感不足作为设计问题，目标是把“看作品”连接到“理解怎样制作”。</p><p className={styles.sourceNote}>目标任务依据最终版开发汇报整理；受众定位不等同于已完成的用户验证。</p></div>
          <dl className={styles.userTasks}>
            <div><dt>初次了解</dt><dd>学生与年画初学者，需要快速认识题材、历史与基本工艺。</dd></div>
            <div><dt>按主题查找</dt><dd>文化兴趣用户，需要把流派、作品、工艺和传承人联系起来。</dd></div>
            <div><dt>参与体验</dt><dd>普通浏览者可以通过选稿、套印和盖章，直观看到制作过程。</dd></div>
          </dl>
        </div>
      </CaseSection>

      <ProductFramework label="PRODUCT DECISIONS" title="把科普内容，组织成可探索的路径。" summary="用内容结构降低查找负担，用交互状态解释工艺。功能取舍围绕“找到知识、理解关系、完成一次体验”展开。" rows={[
        { problem: "资料零散，浏览者难以串联历史、地域与技艺。", decision: "按历史、流派、作品、工艺与传承人组织内容，不把所有资料堆在同一长页。", evidence: "最终版汇报中的内容结构，以及真实网站的主题导航、时间线与地图入口。" },
        { problem: "静态成品难以解释多次套印怎样形成画面。", decision: "将体验拆成选稿、墨线版、套色与盖章；让每次动作对应可见变化。", evidence: "四张不同的原始状态界面，以及小游戏设计逻辑和套色印刷拆解图。" },
        { problem: "用户需要知道正在制作哪一幅、已经使用哪些色版。", decision: "记录当前线稿、选中颜色与已用色版；保留步骤导航和重新体验入口。", evidence: "设计说明中的三个状态字段，及界面中的线稿预览、色版区与重新开始按钮。" },
      ]} validation="已具备公开网站、原始界面与最终版汇报。尚无可核验的学习效果、任务完成率或用户反馈数据，因此不将设计目标表述为已验证成果。" />

      <CaseSection id="nianhua-information" eyebrow="INFORMATION MODEL" title="知识按主题进入，体验从工艺展开。">
        <div className={styles.knowledgeLine}>
          {[["历史溯源", "沿时间脉络认识年画"], ["地域流派", "连接六大流派与地方风格"], ["经典作品", "从题材进入代表作品"], ["制作工艺", "拆解刻版与印刷过程"], ["传承人物", "看见技艺背后的手艺人"]].map(([title, text]) => <div key={title}><span aria-hidden="true" /><h3>{title}</h3><p>{text}</p></div>)}
        </div>
        <div className={styles.modelEvidence}>
          <div><h3>地图承担关系解释。</h3><p>地域流派不是一组孤立名称。地区高亮与图文卡片，把位置、作品和工艺放到同一个上下文中；时间线则提供另一条按年代理解内容的路径。</p></div>
          <CaseImage src={`${nianhuaImages}regions.png`} alt="地域流派地图中绵竹地区高亮并展示作品及工艺详情" width={1920} height={1080} sizes={halfSizes} caption="信息模型的实现证据 · 地域与流派联动" />
        </div>
      </CaseSection>

      <CaseSection id="nianhua-game-logic" eyebrow="INTERACTION & STATE MODEL" title="套色印刷，是一次可见的状态推进。" className={styles.printSection}>
        <p className={styles.lead}>小游戏把线稿与对应色版作为输入，让选稿、刻版、套印和盖章逐步改变画面。分层图解释的是墨线与色版如何对齐成画，属于互动机制。</p>
        <div className={styles.mechanismLayout}>
        <div className={styles.mechanismCopy}>
        <div className={styles.stateFields}>
          <div><h3>当前线稿</h3><code>selectedDraftIndex</code><p>记录正在制作哪一幅；初始未选择。</p></div>
          <div><h3>选中颜色</h3><code>selectedColors</code><p>记录本次操作涉及的颜色选择。</p></div>
          <div><h3>已用色版</h3><code>usedColorPlates</code><p>记录已使用的色版，与画面推进对应。</p></div>
        </div>
        <table className={styles.mechanismTable}>
          <caption className="sr-only">木版年画小游戏的输入、动作、状态与反馈</caption>
          <thead><tr><th scope="col">输入</th><th scope="col">用户动作</th><th scope="col">状态推进</th><th scope="col">可见反馈</th></tr></thead>
          <tbody>
            {[
              ["可选年画线稿", "选择一张线稿", "记录当前稿件", "左上预览显示选择结果，明确正在制作哪一幅。"],
              ["已选稿件与木材入口", "选木材、刻墨线版", "空白木板进入墨线状态", "对应线稿出现在木板上，先建立轮廓。"],
              ["与当前稿件匹配的色版", "逐个点击色版", "更新颜色与已用色版记录", "颜色出现在对应部位，画面逐层接近成品。"],
              ["已完成上色的画面", "盖章；需要时重新开始", "由制作态进入成品态", "右上出现印章，保留完成结果与再次体验入口。"],
            ].map(([input, action, state, feedback]) => <tr key={input}><th scope="row" data-label="输入">{input}</th><td data-label="用户动作">{action}</td><td data-label="状态推进">{state}</td><td data-label="可见反馈">{feedback}</td></tr>)}
          </tbody>
        </table>
        </div>
        <div className={styles.mechanismFigures}>
          <CaseImage src={`${nianhuaImages}game-logic.png`} alt="小游戏原始设计逻辑图，包含状态记录字段、选稿刻版套印盖章流程" width={1291} height={740} sizes={halfSizes} caption="原始设计说明 · 状态字段与玩法逻辑" />
          <CaseImage src={`${nianhuaImages}overprint-breakdown.png`} alt="小游戏套色印刷拆解图，黄色红色蓝色与墨线版对齐叠加" width={2600} height={2040} sizes={halfSizes} caption="套色机制证据 · 墨线与逐色色版的叠加关系" />
        </div>
        </div>
        <EvidenceDetails title="查看四步真实界面" count="4 张不同状态图">
          <div className={styles.imagePair}>
            {[
              { file: "game-select.png", alt: "年画互动选择线稿界面，空白画框右侧展示可选作品", caption: "选择线稿" },
              { file: "game-outline.png", alt: "年画互动刻墨线版界面，画框内出现黑色线稿", caption: "刻制墨线版" },
              { file: "game-colors.png", alt: "年画互动套色印刷界面，墨线稿旁排列不同颜色的色版", caption: "套色印刷" },
              { file: "game-finished.png", alt: "年画互动盖章完成界面，彩色年画右上有红色印章", caption: "盖章成画" },
            ].map(({ file, alt, caption }) => <CaseImage key={file} src={`${nianhuaImages}${file}`} alt={alt} width={1920} height={1080} sizes={halfSizes} caption={caption} />)}
          </div>
        </EvidenceDetails>
      </CaseSection>

      <CaseSection id="nianhua-interface-evidence" eyebrow="IMPLEMENTATION EVIDENCE" title="界面为产品决策提供证据。">
        <p className={styles.lead}>时间线、作品浏览、工艺说明与人物介绍，各自承担不同的知识任务。完整界面按需展开，保留原始内容与比例。</p>
        <EvidenceDetails title="查看完整网站界面" count="5 张真实页面">
          <div className={styles.imagePair}>
            <CaseImage className={styles.full} src={`${nianhuaImages}home.png`} alt="纸间风华真实首页，以民俗年画长卷组织文化入口" width={1920} height={1080} caption="首页 · 内容入口" />
            <CaseImage src={`${nianhuaImages}history-live.png`} alt="纸间风华线上历史时间线，展示不同朝代与代表图像" width={1920} height={1080} sizes={halfSizes} caption="历史溯源 · 线上截图" />
            <CaseImage src={`${nianhuaImages}classic.png`} alt="经典作品五类年画环绕展示界面，保留原设备框" width={2584} height={1509} sizes={halfSizes} caption="经典作品 · 按题材浏览" />
            <CaseImage src={`${nianhuaImages}craft.png`} alt="制作工艺页面，实操照片与工序文字并置" width={1920} height={1080} sizes={halfSizes} caption="制作工艺 · 工序拆解" />
            <CaseImage src={`${nianhuaImages}inheritors-live.png`} alt="非遗传承人页面，以人物照片展示手艺人" width={1920} height={1080} sizes={halfSizes} caption="传承人物 · 线上截图" />
          </div>
        </EvidenceDetails>
      </CaseSection>

      <CaseSection id="nianhua-boundaries" eyebrow="EVIDENCE, LIMITS & NEXT STEPS" title="把已实现与待验证分开。">
        <div className={styles.boundaryGrid}>
          <div><h3>已有证据</h3><ul><li>公开可访问的网站与独立真实界面。</li><li>最终版汇报中的内容结构与小游戏状态说明。</li><li>完整设计展板，保留为项目过程材料。</li></ul></div>
          <div><h3>下一步验证</h3><ul><li>围绕查找流派、理解工序、完成套印开展任务走查。</li><li>补齐重复选色、重新开始及异常操作的状态验证记录。</li><li>补充真实用户反馈；目前不声称学习效果或成功率提升。</li></ul></div>
        </div>
        <p className={styles.sourceNote}>暖纸色、墨线与印章用于承接年画语境。独立品牌、图标与字体规范资料仍待补充；套色色层不作为网站配色规范。</p>
        <VisitSite href={nianhuaSite} />
      </CaseSection>

      <CaseSection id="nianhua-boards" eyebrow="ORIGINAL PROJECT BOARDS" title="完整项目展板。">
        <p className={styles.lead}>三张原始展板按顺序完整预览。点击放大查看完整展板，保留研究整理、设计结构与界面过程。</p>
        <div className={styles.boards}>
          <CaseImage src={`${nianhuaImages}board-1.jpg`} alt="纸间风华完整项目展板一，包含项目背景、用户旅程与低保真流程" width={3508} height={4961} sizes={boardSizes} caption="展板一 · 点击放大原始全图" />
          <CaseImage src={`${nianhuaImages}board-2.jpg`} alt="纸间风华完整项目展板二，包含内容架构、视觉规范与网站界面" width={3508} height={4961} sizes={boardSizes} caption="展板二 · 点击放大原始全图" />
          <CaseImage src={`${nianhuaImages}board-3.jpg`} alt="纸间风华完整项目展板三，包含制作工艺、互动体验与界面应用" width={3508} height={4961} sizes={boardSizes} caption="展板三 · 点击放大原始全图" />
        </div>
      </CaseSection>
    </article>
  );
}

export function LiaoningCase() {
  return (
    <article className={`${styles.case} ${styles.liaoning}`}>
      <CaseIntro kicker="REGIONAL CULTURE / CONTENT PRODUCT" title="山海辽藏" summary="以 17 件辽宁物产档案为线索，让检索、地域理解与个人收藏形成连续的内容体验。">
        <div className={styles.meta}><span>地域文化内容产品</span><span>产品设计 / AI 协作网页开发</span><span>已上线可访问</span></div>
        <VisitSite href={liaoningSite} />
      </CaseIntro>
      <div className={styles.cover}><CaseImage src={`${liaoningImages}cover.png`} alt="山海辽藏真实首页，深色标题与海岸平原山林矿产摄影并置" width={1910} height={883} priority caption="真实首页 · 四类自然资源构成内容入口" /></div>

      <CaseSection id="liaoning-problem" eyebrow="PROBLEM & USER TASKS" title="从认出一件物产，到理解它的来处。">
        <div className={styles.problemGrid}>
          <div><p className={styles.lead}>物产内容容易停留在名称与图片展示。项目希望把自然条件、产区与地方记忆组织成档案，让地域文化兴趣用户和展陈浏览者能够查找、理解并保留感兴趣的内容。</p><p className={styles.sourceNote}>任务定位来自设计报告与现有网页结构，不代表已完成的人群实验或使用效果验证。</p></div>
          <dl className={styles.userTasks}><div><dt>查找</dt><dd>按自然环境、风物、生长或城地线索找到物产。</dd></div><div><dt>理解</dt><dd>连接产地、形成过程与地域关系，而不只看单品名称。</dd></div><div><dt>保留</dt><dd>把感兴趣的档案加入路线，形成可预览的分享海报。</dd></div></dl>
        </div>
      </CaseSection>

      <ProductFramework label="CONTENT PRODUCT DECISIONS" title="让档案之间，建立可追随的联系。" summary="用一致的档案结构承载不同物产，再用成长链、地图和收藏路径解释它们之间的关系。" rows={[
        { problem: "单品展示难以解释物产与自然环境之间的联系。", decision: "将海岸、平原、山林与矿脉作为内容线索，以成长链和产区图谱展开关系。", evidence: "首页四域摄影、成长链页面与产区图谱的原始界面。" },
        { problem: "多件物产需要可检索、可比较的阅读结构。", decision: "统一编号、产区、线索与操作入口；在筛选、卡片与档案详情之间保持上下文。", evidence: "17 件档案列表、大连海参详情，以及图谱展开状态。" },
        { problem: "浏览结束后，用户需要保留个人感兴趣的内容。", decision: "把加入路线、收藏汇总、路径生成与海报预览连接成一条输出流程。", evidence: "已收藏 4 件物产的路线界面、初始空状态与真实海报预览图。" },
      ]} validation="现网站与原始资料能支持界面和流程的存在；尚未提供任务成功率、留存或传播效果数据。AI 协作的具体工具、提示、修改取舍及验证记录仍需补充。" />

      <CaseSection id="liaoning-model" eyebrow="INFORMATION & INTERACTION MODEL" title="检索、理解、收藏，各有清楚的去向。">
        <div className={styles.archiveModel}><div className={styles.archiveRoot}>输入：自然、风物、生长与城地线索</div><div className={styles.archiveNodes}>{[["物产探索", "检索档案并查看详情"], ["成长链", "理解物产的形成过程"], ["产区图谱", "连接地点与自然环境"], ["风物游戏", "通过互动识别风物"], ["路线生成", "收藏并预览分享海报"]].map(([title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div><div className={styles.modelOutput}>输出：理解一件物产 / 建立地域关联 / 留下一条收藏路线</div></div>
        <div className={styles.modelNote}><h3>地图不是单独的装饰。</h3><p>产区展开后继续呈现关联档案，让位置与物产内容互相说明。成长链补充过程视角，两者共同支撑从“在哪里”到“怎样形成”的理解。</p></div>
        <CaseImage src={`${liaoningImages}atlas-detail.png`} alt="山海辽藏产区图谱展开区域侧面板，显示与地图关联的物产档案" width={1570} height={775} caption="交互模型证据 · 产区、地图与档案联动" />
      </CaseSection>

      <CaseSection id="liaoning-route" eyebrow="OUTPUT & CONTINUITY" title="把读过的风物，连成你的辽宁。" className={styles.routeSection}>
        <div className={styles.routeGallery}><div><p className={styles.lead}>加入路线将分散的浏览转为个人收藏。选择结果继续进入路径与海报预览，给内容阅读一个可保留的输出。</p><CaseImage src={`${liaoningImages}selected-route.png`} alt="山海辽藏已收藏四件物产后的路线生成界面" width={1445} height={780} sizes="(max-width: 639px) 90vw, 58vw" caption="已选状态 · 4 件物产形成的路线" /></div><CaseImage src={`${liaoningImages}route-poster.png`} alt="辽宁物产打卡指南真实海报预览，路线连接四张收藏卡片" width={725} height={870} sizes="(max-width: 639px) 90vw, 34vw" caption="输出证据 · 真实海报预览" /></div>
      </CaseSection>

      <CaseSection id="liaoning-interface-evidence" eyebrow="IMPLEMENTATION EVIDENCE" title="完整界面，按任务组织。">
        <p className={styles.lead}>检索、详情、成长链与图谱对应理解任务；游戏与路线空状态提供继续参与的入口。完整原图按需展开。</p>
        <EvidenceDetails title="查看完整界面" count="6 张真实页面与状态">
          <div className={styles.imagePair}>
            <CaseImage src={`${liaoningImages}explore.png`} alt="物产探索完整长页，线索筛选下展示十七件物产卡片" width={1910} height={3508} sizes={halfSizes} caption="检索任务 · 物产探索完整长页" />
            <div className={styles.evidenceStack}><CaseImage src={`${liaoningImages}product-detail.png`} alt="大连海参档案详情，包含照片编号产地与档案字段" width={1097} height={929} sizes={halfSizes} caption="阅读任务 · 单品档案" /><CaseImage src={`${liaoningImages}growth.png`} alt="盘锦大米成长链，从湿地环境到种植加工和地域价值" width={1910} height={2133} sizes={halfSizes} caption="理解任务 · 成长链" /></div>
            <CaseImage src={`${liaoningImages}atlas.png`} alt="产区图谱完整页面，以辽宁地图组织地域节点与自然环境" width={1910} height={1882} sizes={halfSizes} caption="关系任务 · 产区图谱" />
            <CaseImage src={`${liaoningImages}game.png`} alt="风物互动游戏页面，嵌入辽宁物产识别与匹配游戏" width={1910} height={2008} sizes={halfSizes} caption="参与入口 · 风物游戏" />
            <CaseImage className={styles.full} src={`${liaoningImages}route.png`} alt="未收藏物产时的路线初始页面，提示前往档案加入路线" width={1910} height={1804} caption="初始状态 · 尚无收藏时提示下一步" />
          </div>
        </EvidenceDetails>
      </CaseSection>

      <CaseSection id="liaoning-boundaries" eyebrow="EVIDENCE, LIMITS & NEXT STEPS" title="先明确交付，再补齐验证。">
        <div className={styles.boundaryGrid}><div><h3>已具备</h3><ul><li>公开可访问的网站与 17 件物产的档案内容。</li><li>筛选、详情、地图、成长链及路线输出的界面证据。</li><li>说明跨媒介方向与网页结构的设计报告。</li></ul></div><div><h3>下一步</h3><ul><li>按检索、查看地域关联、收藏与海报预览开展任务走查。</li><li>补齐新增／移除收藏、空状态与跨设备分享的验证记录。</li><li>记录 AI 介入环节、人工修改与最终确认，避免只罗列工具。</li></ul></div></div>
        <div className={styles.implementation}><div><p>自然影像、编号和档案字段共同建立内容秩序。独立品牌、图标与字体规范文件仍待补充；当前不将案例主题色当作产品已交付规范。</p><VisitSite href={liaoningSite} /></div><PendingMaterial title="AI 协作过程资料" note="具体工具、提示、生成记录、人工取舍与迭代验证尚未提供，后续以真实过程材料补充。" /></div>
      </CaseSection>
    </article>
  );
}
