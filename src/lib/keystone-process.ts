// Public aggregates from reviewed historical records. Exact source index stays in ignored artifacts/.
export const keystoneProblems = [
  { problem: "资料分散，研究会断", detail: "文件、检索与答案各自存在。", judgment: "研究过程需要稳定载体", reason: "刷新后仍要保留当时的范围与依据。", goal: "项目化研究空间", output: "资料、对话和成果共用一个上下文。" },
  { problem: "有答案，不代表有依据", detail: "引用编号也可能掩盖冲突。", judgment: "依据应先于生成结论", reason: "需要区分位置匹配与语义支持。", goal: "可回查的证据链", output: "逐条引用、缺口保留与人工确认。" },
  { problem: "聊天难以成为交付物", detail: "长段回答不便比较和复用。", judgment: "研究结果需要统一结构", reason: "对象、维度与版本必须明确。", goal: "结构化研究成果", output: "分析表 → 正式版本 → 研究简报。" },
] as const;

export const keystoneFlow = [
  { title: "上传资料", actor: "用户 + 程序", text: "归入项目，保留文档版本。" },
  { title: "解析与检索", actor: "程序", text: "提取文本，关键词召回原文。" },
  { title: "问答与规划", actor: "DeepSeek + 用户", text: "基于原文回答，确认分析维度。" },
  { title: "结构化分析", actor: "DeepSeek", text: "按对象生成，字段限定来源。" },
  { title: "引用核验", actor: "程序 + 模型 + 用户", text: "核对位置与支持关系。" },
  { title: "简报与保存", actor: "程序 + 用户", text: "汇编已存结论，编辑和导出。" },
] as const;

export const keystoneDecisions = [
  { id: "A", title: "把一次检索，变成可恢复的研究过程", issue: "刷新后，检索结果丢失。", cause: "结果停留在页面内存，旧历史又依赖模型状态。",
    before: ["页面内存", "刷新", "检索丢失"], after: ["项目对话", "持久化", "状态恢复"],
    decision: "将研究恢复与模型调用解耦，问题、范围、状态与引用一起保存。",
    result: "59/59 条符合条件的旧成功问答幂等回填；未落库的旧检索不能追回。", source: "E02 · 71ce6d7" },
  { id: "B", title: "让用户选中的依据，真正约束生成", issue: "原文勾选与后续分析脱节。", cause: "范围跨越规划、草稿和生成，不能只依赖界面选中态。",
    before: ["原文勾选", "跨模块", "边界不清"], after: ["选中依据", "写入草稿", "服务端校验", "对象范围交集"],
    decision: "把 evidenceContext 贯穿规划与生成；没有覆盖就保留缺口，不扩大范围猜测。",
    result: "本地 12 条命中选 1 条入草稿并可恢复；Mock 断言范围外依据不进请求。", source: "E03–04 · a2a9a62" },
  { id: "C", title: "面对缺口和冲突，不替用户选一个答案", issue: "模型可能并列确定值与冲突，误导阅读。", cause: "有引用不代表覆盖冲突两端，同模型复核也可能误放行。",
    before: ["有引用", "单端值与冲突并存"], after: ["缺口保留", "双端引用", "逐项确认", "版本保存"],
    decision: "要求冲突两端证据，保守隐藏单端附加主张；不足、失败与已查看分开。",
    result: "历史真实复测保留双端冲突；位置核对与结构断言分别验证，不推导准确率。", source: "E16–17 · 269906d" },
] as const;

export const keystoneTokens = [
  { label: "输入 · 缓存命中", value: 1920 },
  { label: "输入 · 未命中", value: 9414 },
  { label: "模型输出", value: 2224 },
] as const;

export const keystoneCalls = [
  { label: "研究回答", value: 3 }, { label: "支持度复核", value: 2 }, { label: "研究规划", value: 1 },
  { label: "对象分析", value: 3 }, { label: "整体检查", value: 1 },
] as const;

export const keystoneTimeline = [
  { date: "10 / 05", title: "规划与确认", note: "固定字段 → 共享维度" },
  { date: "11 / 20", title: "过程整合", note: "持久化 + 范围联动" },
  { date: "11 / 22", title: "真实模型验收", note: "10 次隔离请求" },
  { date: "11 / 23", title: "访客隔离", note: "本地权限与预算验收" },
  { date: "11 / 24", title: "公网准备中", note: "入口关闭 · 尚未部署" },
] as const;

export const keystonePublicEvidence = [
  { id: "E01", record: "10/05 · 产品反馈与规划记录", scope: "个人工作流观察，未做外部访谈或问卷。" },
  { id: "E02–04", record: "11/20 · 对话持久化与范围联动", scope: "59 条历史回填、本地检索及 Mock 协议验证。" },
  { id: "E05–08", record: "11/22 · DeepSeek 隔离验收报告与调用元数据", scope: "10 次真实请求；输入 11,334 / 输出 2,224 Token。10 条分析结论含 19 处引用。" },
  { id: "E09–12", record: "解析源码与 P1.5 本地专项", scope: "7 类基础格式；20 / 8 / 6 分别为安全、预算、研究隔离，套件不相加。" },
  { id: "E13–15", record: "11/24 · 最新 P2.3 工作区记录", scope: "云资源与空库已准备；Worker 未部署、Access 未核验、入口关闭。P2 文档未提交。" },
  { id: "E16–18", record: "冲突、版本门禁与简报汇编源码", scope: "同模型复核不是独立盲评；简报无独立 AI 写作，人工改写不自动复核语义。" },
] as const;
