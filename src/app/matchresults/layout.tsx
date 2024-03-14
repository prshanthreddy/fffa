import styles from './styles.module.css'

export default function MatchResultsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className={styles.matchresults}>{children}</section>
}
