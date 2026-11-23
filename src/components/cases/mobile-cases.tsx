import type { ReactNode } from "react";
import { CaseImage, CaseIntro, CaseSection, PendingMaterial } from "./case-primitives";
import { ProductFramework } from "./product-framework";
import styles from "./mobile-cases.module.css";

type Screen = { file: string; title: string; note?: string; width?: number; height?: number };
type PathStep = { title: string; text: string };

const shiyueStates = [
  { file: "state-cycle", title: "经期", input: "日期与周期信息", content: "日历与经期记录", note: "通过经期与周期设置，建立记录的基础信息。" },
  { file: "state-preparing", title: "备孕", input: "上次月经、持续与周期天数", content: "备孕内容与工具", note: "在备孕设置中收集与阶段相关的信息。" },
  { file: "state-pregnant", title: "怀孕", input: "预产期或末次月经", content: "孕周信息与孕育内容", note: "围绕预产期填写信息，并提供末次月经切换入口。" },
  { file: "state-parenting", title: "育儿", input: "宝宝生日、性别与是否足月", content: "宝宝信息与成长记录", note: "信息对象由母亲阶段延伸到宝宝的基础资料。" },
];

function Screens({ project, items, columns = "three" }: { project: "shiyue" | "yanyu"; items: Screen[]; columns?: "three" | "four" | "five" | "two" }) {
  const normalWidth = project === "shiyue" ? 750 : 1242;
  const normalHeight = project === "shiyue" ? 1334 : 2208;
  const desktopSize = columns === "five" ? "240px" : columns === "four" ? "270px" : "330px";
  return <div className={`${styles.screenGrid} ${styles[columns]}`}>{items.map((item) => <div className={styles.screenItem} key={item.file}><CaseImage src={`/images/projects/${project}/${item.file}.webp`} alt={`${project === "shiyue" ? "十月" : "堰遇青城"}原始设计：${item.title}`} width={item.width || normalWidth} height={item.height || normalHeight} caption={item.title} sizes={`(max-width: 639px) 88vw, (max-width: 1023px) 40vw, ${desktopSize}`} />{item.note && <p className={styles.screenNote}>{item.note}</p>}</div>)}</div>;
}

function TaskPath({ steps, label }: { steps: PathStep[]; label: string }) {
  return <ol className={styles.taskPath} aria-label={label}>{steps.map((step, index) => <li key={step.title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>;
}

function DesignArchive({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return <details className={styles.archive} data-case-archive><summary><span>{title}</span><small>查看原始设计</small></summary><div className={styles.archiveContent}><p className={styles.archiveDescription}>{description}</p>{children}</div></details>;
}

export function ShiyueCase() {
  return <article className={`${styles.case} ${styles.shiyue}`} aria-labelledby="project-heading">
    <div className={styles.hero}>
      <div className={styles.heroCopy}>
        <CaseIntro kicker="OCTOBER / C-END MOBILE CONCEPT" title="十月" summary="母婴社区 App 产品与 UI 交互设计">
          <p className={styles.heroDescription}>以孕育阶段为组织线索，将内容、交流与记录放入一条可理解的使用路径。C 端移动应用概念设计。</p>
        </CaseIntro>
      </div>
      <CaseImage className={styles.shiyueCover} src="/images/projects/shiyue/cover-start.webp" alt="十月原始启动页手机样机，懂宝贝更懂你" width={735} height={1309} sizes="(max-width: 639px) 76vw, (max-width: 1023px) 38vw, 330px" priority />
    </div>

    <ProductFramework
      label="01 / PRODUCT DECISIONS"
      title="先识别阶段，再组织任务。"
      summary="设计命题：用户处于经期、备孕、怀孕与育儿等不同阶段时，关注的信息和记录对象会变化。产品需要说明“当前是谁、现在需要什么、下一步去哪里”。"
      rows={[
        { problem: "进入应用后，如何明确当前阶段？", decision: "将四种用户状态显式区分，为不同阶段收集对应的基础信息，不用一份通用表单承载全部输入。", evidence: "经期、备孕、怀孕与育儿四份设置稿，分别呈现周期、预产期或宝宝资料字段。" },
        { problem: "如何找到与当前阶段有关的内容？", decision: "以阶段首页组织信息与工具，同时保留首页、社区、记录、我的等稳定导航。", evidence: "备孕首页、孕期首页、宝宝首页与经期记录稿；现有经期图是记录页，不冒充独立首页。" },
        { problem: "内容浏览之外，如何承接日常行为？", decision: "将社区交流与个人记录分为不同任务：交流按问答、广场、话题组织，记录围绕经期与宝宝成长展开。", evidence: "社区三种内容视图、经期日历与成长记录页，呈现不同的信息组织方式。" },
        { problem: "孕育工具与社区内容应有什么边界？", decision: "在概念范围内展示分类与入口；内容准确性、健康信息审核和记录隐私需作为后续验证条件。", evidence: "食材、营养、产检和儿歌原稿可作为信息分类证据；没有实际服务接入或医学有效性验证材料。" },
      ]}
      validation="以上基于现有概念稿说明产品逻辑，不代表已经进行用户访谈或验证了需求优先级。状态理解、内容可信度与记录任务完成情况仍需通过原型测试和内容审核确认。"
    />

    <CaseSection className={styles.section} id="shiyue-state-model" eyebrow="02 / STATE & TASK MODEL" title="一套导航，四种使用情境。">
      <p className={styles.sectionLead}>状态决定基础信息与内容重点，导航维持跨阶段的认知连续性。四种情境可按实际情况选择或更新，不将其画成必须依次经过的线性流程。</p>
      <div className={styles.stateModel} aria-label="四阶段的信息与内容关系">{shiyueStates.map((state) => <div key={state.file}><h3>{state.title}</h3><dl><div><dt>基础信息</dt><dd>{state.input}</dd></div><div><dt>内容重点</dt><dd>{state.content}</dd></div></dl></div>)}</div>
      <p className={styles.pathLabel}>核心任务路径 / CONCEPTUAL USER PATH</p>
      <TaskPath label="十月核心任务路径" steps={[
        { title: "确认阶段", text: "选择状态，填写该阶段需要的基础资料。" },
        { title: "查看阶段内容", text: "从首页进入与当前情境相关的内容或工具。" },
        { title: "交流或记录", text: "按目的进入社区内容，或保存个人成长记录。" },
        { title: "回到个人信息", text: "从个人中心查看阶段资料与常用入口。" },
      ]} />
    </CaseSection>

    <CaseSection className={styles.section} id="shiyue-scope" eyebrow="03 / SCOPE & TRADE-OFFS" title="先把核心体验组织清楚。">
      <div className={styles.scopeGrid}>
        <div><span>设计主线</span><h3>阶段 → 内容 → 行动</h3><p>用状态设置、阶段首页、交流和记录串起一条主线，而不是从所有工具的数量定义产品价值。</p></div>
        <div><span>信息取舍</span><h3>入口稳定，内容变化</h3><p>通过不同阶段的首页承接内容差异；社区与记录保持独立入口，避免将交流和个人资料混为同一种信息流。</p></div>
        <div><span>当前范围</span><h3>概念设计与原型命题</h3><p>现有交付为 UI 与交互方案。推荐依据、数据存储、内容审核和真实健康服务接入不属于已完成实现。</p></div>
      </div>
    </CaseSection>

    <CaseSection className={styles.section} id="shiyue-evidence" eyebrow="04 / DESIGN EVIDENCE" title="用三份界面，解释产品决策。">
      <p className={styles.sectionLead}>状态输入建立情境，首页聚合对应信息，成长记录承接持续使用。界面在这里作为产品逻辑的证据，完整设计保留在下方档案中。</p>
      <Screens project="shiyue" items={[
        { file: "state-pregnant", title: "情境输入：怀孕状态", note: "预产期与末次月经的输入方式，为后续阶段信息提供组织依据。" },
        { file: "home", title: "内容聚合：孕期首页", note: "将孕周信息、内容和工具放在同一层级中，说明阶段内容如何被找到。" },
        { file: "growth-record", title: "持续任务：成长记录", width: 974, height: 1836, note: "以宝宝成长内容和新增记录入口承接浏览之后的个人任务。" },
      ]} />
    </CaseSection>

    <CaseSection className={styles.section} id="shiyue-validation" eyebrow="05 / NEXT VALIDATION" title="下一步，验证任务而非堆叠功能。">
      <p className={styles.sectionLead}>以下是进入可测试原型前需要回答的问题，不是已完成测试的结论。</p>
      <div className={styles.validationGrid}>
        <div><h3>状态是否易理解？</h3><p>让参与者选择并修改自己的阶段，观察字段含义与状态切换是否清楚。</p><small>待观察：误选、修改入口与信息重填。</small></div>
        <div><h3>核心内容是否可找到？</h3><p>以寻找产检信息或查看成长记录为任务，核对入口层级与术语是否匹配理解。</p><small>待观察：路径偏离、返回行为与完成情况。</small></div>
        <div><h3>信息是否值得信任？</h3><p>检查内容来源、健康信息边界以及个人资料的提示，避免界面表现被理解为专业诊断。</p><small>待补充：内容审核、隐私规则与原型验证记录。</small></div>
      </div>
    </CaseSection>

    <CaseSection className={styles.section} id="shiyue-design-archive" eyebrow="DESIGN ARCHIVE" title="完整界面与原始设计">
      <p className={styles.sectionLead}>按任务展开查看，原图比例和放大预览均保留。状态设置与首页／记录视图分开展示。</p>
      <DesignArchive title="状态设置与阶段内容" description="除上方怀孕状态与孕期首页外，其余状态表单及阶段内容在此完整保留。经期材料为记录视图。">
        <h3 className={styles.subheading}>其余三种状态设置</h3>
        <Screens project="shiyue" items={shiyueStates.filter((state) => state.file !== "state-pregnant").map((state) => ({ file: state.file, title: `${state.title}状态设置`, note: state.note }))} />
        <div className={styles.toolExtension}><h3 className={styles.subheading}>不同阶段的内容视图</h3><Screens project="shiyue" items={[
          { file: "cycle-record", title: "经期记录视图", note: "月历、经期区间及记录入口；不是独立经期首页。" },
          { file: "preparing-home", title: "备孕首页", note: "日历与工具入口的原始概念界面。" },
          { file: "baby-home", title: "宝宝首页", note: "宝宝成长信息、提醒与内容工具。" },
        ]} /></div>
      </DesignArchive>
      <DesignArchive title="登录、社区与个人中心" description="登录与个人中心承担进入和管理；问答、广场与话题呈现不同的交流方式。">
        <Screens project="shiyue" columns="two" items={[
          { file: "login", title: "登录界面", note: "母婴插画与十月标识构成视觉入口。" },
          { file: "profile", title: "个人中心", note: "孕育状态、个人信息及常用功能入口。" },
        ]} />
        <div className={styles.toolExtension}><Screens project="shiyue" items={[
          { file: "community-questions", title: "社区问答", width: 474, height: 843, note: "原图 474 × 843，保留原始清晰度。" },
          { file: "community-square", title: "社区广场", width: 803, height: 1431, note: "以动态卡片组织内容。" },
          { file: "community-topics", title: "社区话题", width: 801, height: 1428, note: "以话题分类与讨论入口组织内容。" },
        ]} /></div>
      </DesignArchive>
      <DesignArchive title="孕育工具与育儿内容" description="展示食材、营养、产检与儿歌的原始分类和内容组织；不据此宣称医学有效性或服务实现。">
        <Screens project="shiyue" columns="two" items={[
          { file: "food-guide", title: "能不能吃", note: "食材分类与不同阶段的内容切换。" },
          { file: "pregnancy-nutrition", title: "孕期营养", note: "孕期内容、快捷工具与提问栏目。" },
          { file: "prenatal-checkups", title: "产检表", note: "按孕周组织列表。" },
          { file: "nursery-stories", title: "儿歌故事", note: "内容分类、榜单与故事推荐。" },
        ]} />
        <p className={styles.evidenceNote}>宝宝起名 · 素材待补充。当前资料未包含独立起名界面，后续使用原始截图补充。</p>
      </DesignArchive>
      <DesignArchive title="品牌视觉与原始样机" description="保留母婴线稿、应用图标与原始手持图。视觉表达服务于温和、清晰的内容阅读。">
        <div className={styles.shiyueVisual}><CaseImage className={styles.brandPoster} src="/images/projects/shiyue/brand-start.webp" alt="十月原始启动视觉，母婴线稿与粉色构图" width={750} height={1334} caption="原始启动视觉" /><div className={styles.visualCopy}><div className={styles.iconRow}><CaseImage className={styles.appIcon} src="/images/projects/shiyue/app-icon.webp" alt="十月原始应用图标" width={93} height={105} /><div><h3>粉色强调与母婴线稿</h3><p>以轻柔的视觉印象承接孕育内容，保留原始色彩、图标与界面细节。</p></div></div><PendingMaterial title="独立字体与组件规范" note="原始界面已展示，独立字体、字号与组件规范文件尚待补充。" /></div></div>
        <CaseImage className={styles.handMockup} src="/images/projects/shiyue/hand-mockup.webp" alt="十月原始手持手机样机，完整保留蓝紫色背景" width={1024} height={737} caption="原始手持样机 · 保留原始构图与底色" />
      </DesignArchive>
    </CaseSection>
  </article>;
}

export function YanyuCase() {
  return <article className={`${styles.case} ${styles.yanyu}`} aria-labelledby="project-heading">
    <div className={styles.hero}>
      <div className={styles.heroCopy}><CaseIntro kicker="YAN YU QING CHENG / C-END MOBILE CONCEPT" title="堰遇青城" summary="智慧文旅 App UI 与交互设计"><p className={styles.heroDescription}>围绕游客的信息判断、现场服务与文化体验，组织都江堰旅游的移动端任务路径。C 端移动应用概念设计。</p></CaseIntro></div>
      <CaseImage className={styles.yanyuCover} src="/images/projects/yanyu/cover-mockups.webp" alt="堰遇青城原展板中的启动页与首页双手机样机" width={1600} height={1549} priority />
    </div>

    <ProductFramework
      label="01 / PRODUCT DECISIONS"
      title="围绕旅行任务，而非功能清单。"
      summary="设计命题：游客在行前了解、景区现场和文化体验之间切换，所需信息与操作不同。界面需要把“了解、判断、行动”组织成连贯路径。"
      rows={[
        { problem: "行前需要知道去哪、看什么。", decision: "首页组织景区与推荐内容，景点详情承接进一步判断；避免将所有服务一开始平铺给游客。", evidence: "首页、门票列表和景区详情稿，分别承担总览、列表与具体信息层级。" },
        { problem: "现场需要快速定位服务。", decision: "将地图、附近信息、停车与排队等入口集中在服务模块，让情境性任务有明确去处。", evidence: "服务页以地图和附近服务组织内容；位置与排队均为概念信息，未接入实时数据。" },
        { problem: "了解景区后，如何进入预约？", decision: "把信息浏览与日期、景点、游客资料输入分开，减少同页任务混杂。", evidence: "景区详情与预约表单分别展示内容判断和输入操作，没有实际订单或支付验证。" },
        { problem: "地域文化如何延伸旅行体验？", decision: "以发现、非遗与文创形成补充路径，不让 AI／AR 概念入口成为完成导览任务的唯一方式。", evidence: "发现、文创、非遗与导游对话稿作为设计证据；AI、AR 仅为 UI 概念，未声明模型或技术实现。" },
      ]}
      validation="以上说明现有概念方案的任务分工，需求优先级尚待验证。没有已提供的访谈、现场可用性测试、实时定位、订票或 AI 服务实现证据。"
    />

    <CaseSection className={styles.section} id="yanyu-task-model" eyebrow="02 / TASK & INFORMATION MODEL" title="把旅行情境，映射为清晰入口。">
      <div className={styles.tripStages}>
        <div><span>行前了解</span><h3>做出出游判断</h3><p>从景区、路线与文化内容了解目的地，再进入具体信息。</p></div>
        <div><span>景区现场</span><h3>找到眼前的服务</h3><p>地图、导览和附近服务围绕当前位置组织界面。</p></div>
        <div><span>文化延伸</span><h3>让体验继续</h3><p>非遗内容、文创与分享为旅游主线提供可选延伸。</p></div>
      </div>
      <p className={styles.pathLabel}>一条示例任务路径 / CONCEPTUAL USER PATH</p>
      <TaskPath label="堰遇青城景区信息与预约任务路径" steps={[
        { title: "发现目的地", text: "从首页或列表找到感兴趣的景区内容。" },
        { title: "了解具体信息", text: "通过详情阅读景区介绍与导览入口。" },
        { title: "选择日期与景点", text: "在独立预约页中完成选择与资料输入。" },
        { title: "回到服务与个人信息", text: "服务页承接现场任务，我的组织预约等信息入口。" },
      ]} />
      <div className={styles.navigationModel}><span>五个一级入口</span><ul>{["首页", "服务", "发现", "文创产品", "我的"].map((item) => <li key={item}>{item}</li>)}</ul></div>
    </CaseSection>

    <CaseSection className={styles.section} id="yanyu-scope" eyebrow="03 / SCOPE & TRADE-OFFS" title="让主任务不依赖额外能力。">
      <div className={styles.scopeGrid}>
        <div><span>优先组织</span><h3>浏览与服务的基本路径</h3><p>先说明景区信息从哪里找到、现场服务在哪里、预约需要哪些输入，再讨论更多入口。</p></div>
        <div><span>模块取舍</span><h3>主线与延伸分层</h3><p>以首页和服务承接旅行主线，用发现与文创容纳文化内容，避免把每类内容都放在同一层。</p></div>
        <div><span>能力边界</span><h3>界面表达与系统实现分开</h3><p>停车、排队、预约、AI 导游与 AR 都需要数据或技术支撑；现有材料只证明相关界面已设计。</p></div>
      </div>
    </CaseSection>

    <CaseSection className={styles.section} id="yanyu-evidence" eyebrow="04 / DESIGN EVIDENCE" title="用服务、详情与表单解释任务分工。">
      <Screens project="yanyu" items={[
        { file: "service", title: "现场任务：服务页", note: "地图、讲解、停车与排队入口集中组织，说明现场任务的承接位置。" },
        { file: "scenic-detail", title: "信息判断：景区详情", note: "先提供景区介绍与内容，独立呈现需要阅读和理解的信息。" },
        { file: "reservation", title: "具体行动：预约表单", note: "日期、景点与游客信息形成输入任务；不代表真实订单已经完成。" },
      ]} />
    </CaseSection>

    <CaseSection className={styles.section} id="yanyu-validation" eyebrow="05 / NEXT VALIDATION" title="把设计问题，转成可观察的任务。">
      <p className={styles.sectionLead}>以下是下一阶段的原型验证计划，暂未提供真实测试或服务对接结果。</p>
      <div className={styles.validationGrid}>
        <div><h3>现场入口是否足够直接？</h3><p>以寻找附近服务或停车信息为任务，观察首页与服务之间的分工是否清楚。</p><small>待观察：入口选择、返回行为与任务完成。</small></div>
        <div><h3>预约信息是否容易理解？</h3><p>核对景点、日期与游客资料的输入顺序，以及用户是否理解其所在任务阶段。</p><small>待补充：原型、错误状态与表单反馈方案。</small></div>
        <div><h3>延伸内容会否打断主线？</h3><p>检查文化、文创与导游入口是否影响基础导览；主任务应在不使用 AI 的情况下仍可理解。</p><small>待补充：任务优先级、无定位与数据不可用场景。</small></div>
      </div>
    </CaseSection>

    <CaseSection className={styles.section} id="yanyu-design-archive" eyebrow="DESIGN ARCHIVE" title="完整界面与原始设计">
      <p className={styles.sectionLead}>展开查看各模块及原始设计材料。服务、详情与预约页已在上方作为核心证据展示，其余素材按用途保留。</p>
      <DesignArchive title="其余一级模块" description="首页、发现、文创产品与我的，与上方服务页共同构成五个一级入口。">
        <Screens project="yanyu" columns="four" items={[
          { file: "home", title: "首页" }, { file: "discover", title: "发现" }, { file: "culture-shop", title: "文创产品" }, { file: "profile", title: "我的" },
        ]} />
      </DesignArchive>
      <DesignArchive title="门票、导游与文化内容" description="进一步保留列表、对话和地域文化界面。AI 导游只展示概念交互，没有模型接入或回答效果验证。">
        <Screens project="yanyu" items={[
          { file: "tickets", title: "景区门票列表", note: "热门推荐与关联景点的列表设计。" },
          { file: "ai-guide", title: "AI 导游“小堰”", note: "问题输入、对话与快捷提问的概念界面。" },
          { file: "heritage", title: "璀璨非遗", note: "水文化与道教文化等主题内容。" },
        ]} />
      </DesignArchive>
      <DesignArchive title="原始产品架构" description="原展板保留首页、服务、发现、文创产品和我的之间的模块关系，作为产品信息组织的原始证据。">
        <CaseImage src="/images/projects/yanyu/architecture.webp" alt="堰遇青城原设计展板的产品框架图" width={1600} height={951} caption="来源：展板1 · 产品框架局部" />
      </DesignArchive>
      <DesignArchive title="品牌、图标与视觉规范" description="保留原有地域图形、色彩与字体材料。所有内容来自原作品，不为界面补写未经提供的规范。">
        <div className={styles.designGrid}><div><h3 className={styles.subheading}>图标设计</h3><CaseImage src="/images/projects/yanyu/icons.webp" alt="堰遇青城原始导航与服务图标，包含山水桥梁、建筑与熊猫元素" width={1600} height={910} caption="来源：展板1 · icon 设计局部" /></div><div className={styles.designStack}><div><h3 className={styles.subheading}>色彩规范</h3><CaseImage src="/images/projects/yanyu/palette.webp" alt="堰遇青城原设计展板色彩规范与渐变用色" width={1600} height={378} caption="保留原展板色值标注" /></div><div><h3 className={styles.subheading}>字体示例</h3><CaseImage src="/images/projects/yanyu/typography.webp" alt="堰遇青城原设计展板字体示例，墨趣古风体与华文中宋" width={1600} height={275} caption="来源：展板1 · 字体规范局部" /></div></div></div>
        <div className={styles.logoStudy}><h3 className={styles.subheading}>Logo 元素分解</h3><CaseImage src="/images/projects/yanyu/logo-study.webp" alt="堰遇青城原始 logo 与飞鸟、桥及水道元素分解" width={1600} height={407} caption="来源：展板1 · logo 设计局部" /></div>
        <CaseImage className={styles.startPoster} src="/images/projects/yanyu/start.webp" alt="堰遇青城原始山水启动页" width={1242} height={2208} caption="原始启动页" />
      </DesignArchive>
    </CaseSection>
  </article>;
}
