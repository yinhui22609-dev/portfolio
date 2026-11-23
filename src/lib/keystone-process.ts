// Curated from the actual product documents and Codex delivery records.
// Historical test evidence is not a claim of production or user-wide success.
export const keystoneJourney = [
  { stage: "01", title: "需求研究：先确定谁在完成什么任务", question: "为什么不只做一个 PDF 聊天工具？", decision: "从研究密集型知识工作出发，用 JTBD 拆解事实查证、跨文档比较和研究交付；优先聚焦竞品与行业研究。", output: "需求研究 / 用户分层 / 痛点假设", boundary: "采用桌面研究与竞品反推，目标用户访谈仍待开展。" },
  { stage: "02", title: "竞品与定位：把证据作为差异化主线", question: "资料理解、企业搜索与专业分析之间，机会在哪里？", decision: "比较资料工作台、企业搜索、研究 Agent 和专业分析工具，收敛为“可回到原文的多文档研究助手”。", output: "竞品能力矩阵 / 产品定位 / V1 PRD", boundary: "竞品判断为当时产品研究结论，不等同于需求已验证。" },
  { stage: "03", title: "MVP 划分：先跑通一条可核验的闭环", question: "第一版必须做什么，什么可以延后？", decision: "按依赖顺序推进界面骨架、真实上传与解析、带引用问答、研究分析、简报交付；演示数据和真实模型输出分开标识。", output: "分阶段开发任务 / 状态与验收标准", boundary: "联网研究、企业治理和完整多轮能力未被直接视为全部完成。" },
  { stage: "04", title: "工作流设计：让研究范围由人控制", question: "模型应该看哪些资料，又该按什么维度分析？", decision: "连接研究问答、原文检索、选中依据、研究分析与简报；由用户确认资料和分析维度，保留历史与版本。", output: "原文范围约束 / 研究分析表 / 引用抽屉", boundary: "模型建议不能绕过人工确认，也不能把缺少证据的格子自动填满。" },
  { stage: "05", title: "AI 协作开发：把需求拆成可检查的交付", question: "如何让 Codex 的实现始终对应产品目标？", decision: "用需求、任务、验收三层清单推进开发；在隔离分支中整合对话持久化、引用回查、分析联动与中文导出，再回归后合入。", output: "增量迭代 / 功能整合记录 / 回归与导出材料", boundary: "保留已有资料与成果，不以演示通过替代真实流程验证。" },
  { stage: "06", title: "验证与修正：检查答案，也检查失败路径", question: "API 返回结果，是否就意味着研究结果可用？", decision: "以普通问答、资料冲突、资料不足和限定原文分析设计小样本测试；逐条核对结论与原文位置，并修正 PDF 分页等交付问题。", output: "10 次真实模型请求验收 / 冲突与缺口检查 / PDF 复验", boundary: "这是隔离数据上的有限样本验收，不是准确率统计或真实用户实验。Word 视觉检查仍待人工确认。" },
  { stage: "07", title: "发布准备：把本地可用与公网可用分开", question: "让陌生访问者使用，还需要补上什么？", decision: "另建公网版本，增加访客工作区隔离、归属校验、上传任务恢复、预算与并发保护，先做本地验收，再准备云端发布。", output: "公网 P1.5 本地验收 / 首次部署手册", boundary: "公网尚未正式发布；云端运行、HTTPS与外网待验证；数据自动清理及项目／工作区永久删除仍需开发与验收。" },
] as const;

export const keystoneValidation = [
  { task: "普通问答与引用", calls: "2", result: "回答对应真实解析原文，检查引用支持关系。" },
  { task: "资料冲突", calls: "2", result: "保留冲突值及双端引用，不擅自选择一个答案。" },
  { task: "资料不足", calls: "1", result: "缺少交付周期时保留缺口，不编造天数。" },
  { task: "选中原文规划", calls: "1", result: "按指定对象和维度规划，不扩大资料范围。" },
  { task: "多对象分析生成", calls: "3", result: "按对象分别生成，仅引用各自选定的材料。" },
  { task: "整体结论与引用核对", calls: "1", result: "逐条检查结论、文档、页码与引文位置。" },
] as const;
