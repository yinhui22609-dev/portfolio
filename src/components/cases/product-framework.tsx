import styles from "./product-framework.module.css";

type DecisionRow = { problem: string; decision: string; evidence: string };

export function ProductFramework({ label = "PRODUCT THINKING", title, summary, rows, validation }: { label?: string; title: string; summary?: string; rows: DecisionRow[]; validation?: string }) {
  return <section className={styles.framework} data-product-framework aria-label={title}>
    <div className={styles.heading}><p>{label}</p><h2>{title}</h2></div>
    {summary && <p className={styles.summary}>{summary}</p>}
    <table className={styles.table}>
      <caption className="sr-only">{title}：从用户任务到产品决策与证据</caption>
      <thead><tr><th scope="col">用户任务 / 问题</th><th scope="col">产品决策 / 取舍</th><th scope="col">对应方案 / 证据</th></tr></thead>
      <tbody>{rows.map((row) => <tr key={row.problem}><th scope="row" data-label="用户任务 / 问题">{row.problem}</th><td data-label="产品决策 / 取舍">{row.decision}</td><td data-label="对应方案 / 证据">{row.evidence}</td></tr>)}</tbody>
    </table>
    {validation && <div className={styles.validation}><span>验证与边界</span><p>{validation}</p></div>}
  </section>;
}
