import SectionHeadline from '@/components/SectionHeadline'
import styles from './Impressum.module.scss'

export default function Page() {
  return (
    <main className={`main ${styles.impressum}`}>
      <section>
        <SectionHeadline content="Impressum" headlineType="h1">
          <div className={styles.contentWrapper}>
            <p><strong>Diese Seite dient zu Demonstrationszwecken und ist ausschließlich für den privaten Nutzen gedacht.</strong></p>
            <br />
            <p><strong>Developed by Denis Kohleber</strong></p>
            <br />
            <p><strong>© Copyright 2024 Denis Kohleber. All rights reserved.</strong></p>
            <br />
            <br />
            <p>
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
            </p>

            <h2>Kontakt</h2>
            <p>E-Mail: ...</p>

            <h2>Redaktionell verantwortlich</h2>
            <p>...</p>

            <h2>EU-Streitschlichtung</h2>
            <p>
              Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
              bereit:{' '}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                EU Online-Streitbeilegung
              </a>
              .<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>

            <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <h2>
              Zentrale Kontaktstelle nach dem Digital Services Act - DSA (Verordnung (EU) 2022/265)
            </h2>
            <p>
              Unsere zentrale Kontaktstelle f&uuml;r Nutzer und Beh&ouml;rden nach Art. 11, 12 DSA
              erreichen Sie wie folgt:
            </p>
            <p>E-Mail: ...</p>
            <p>
              Die für den Kontakt zur Verf&uuml;gung stehenden Sprachen sind: Deutsch, Englisch.
            </p>
          </div>
        </SectionHeadline>
      </section>
    </main>
  )
}
