import SectionHeadline from '@/components/SectionHeadline'
import styles from './Contact.module.scss'

export default function Page() {
  return (
    <main className={`main ${styles.contact}`}>
      <section>
        <SectionHeadline content="Kontakt" headlineType="h1">
          <div className={styles.contentWrapper}>
            <h2>Kontakt</h2>
            <p>
              Für allgemeine Anfragen, die nicht das Redaktionsteam betreffen, können Sie uns über
              folgende E-Mail-Adresse erreichen.
            </p>
            <p>
              <strong>E-Mail:</strong>{' '}
              <a href="mailto:kontakt@beispiel.de">...</a>
            </p>
            <h2>Redaktionsteam</h2>
            <p>
              Wenn Sie unser Redaktionsteam kontaktieren möchten, erreichen Sie uns
              unter der folgenden E-Mail-Adresse:
            </p>
            <p>
              <strong>E-Mail:</strong>{' '}
              <a href="mailto:redaktion@beispiel.de">...</a>
            </p>

            <h2>Anschrift</h2>
            <p>
              VestaVital
              <br />
              ...
              <br />
              ...
              <br />
              ...
            </p>
          </div>
        </SectionHeadline>
      </section>
    </main>
  )
}
