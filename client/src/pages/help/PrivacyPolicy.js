import React from "react";
import { Helmet } from "react-helmet";

import Header from "../../components/Header.component";
import Footer from "../../components/Footer.component";

function PrivacyPolicy() {
    return (
        <>
            <Helmet>
                <title>Politica de confidențialitate</title>
            </Helmet>

            <Header />

            <div
                style={{
                    margin: "auto",
                    maxWidth: "1200px",
                    backgroundColor: "#fff",
                    lineHeight: 1.15
                }}
            >
                <h1>
                    Politica de utilizare a cookie-urilor și tehnologiilor
                    similare
                </h1>
                <br />
                <p>
                    Pentru a vă oferi cea mai bună experiență, folosim
                    cookie-uri și tehnologii similare. Acestea sunt folosite de
                    către site-ul eDolly, deținut de S.C. DollyBella Software
                    S.R.L, cu sediul social pe strada Câinilor, nr. 25,
                    Târnăveni, județul Mureș. Cookie-urile sunt folosite pentru
                    funcționarea corectă a site-ului și pentru publicitate. Nu
                    colectăm date personale cu scopul de a le vinde. Unele
                    cookie-uri sunt folosite pentru a afișa oferte la produsele
                    pe care le-ați vizualizat.
                </p>
                <br />

                <section>
                    <h4 style={{ fontWeight: "bolder" }}>
                        Ce sunt cookie-urile?
                    </h4>
                    <p>
                        Cookie-ul este un fișier de mici dimensiuni, format din
                        litere și numere, care va fi stocat pe computerul,
                        terminalul mobil sau alte echipamente ale unui
                        utilizator de pe care se accesează internetul.
                    </p>
                    <br />
                </section>

                <section>
                    <h4 style={{ fontWeight: "bolder" }}>
                        La ce ne referim prin "tehnologii similare"?
                    </h4>
                    <p>
                        Când ne referim la tehnologii similare, ne referim la
                        tehnologii precum local storage și session storage, care
                        au aceleași scopuri ca și cookie-urile: să stocheze
                        informații. Spre deosebire de cookie-uri, aceste
                        tehnologii nu sunt trimise în mod direct către server,
                        dar pot fi prelucrate de acesta când acest lucru e
                        necesar (de exemplu: pentru a vă confira identitatea și
                        a vă acorda control asupra contului dvs.)
                    </p>
                    <br />
                </section>

                <section>
                    <h4 style={{ fontWeight: "bolder" }}>
                        La ce folosim cookie-urile?
                    </h4>
                    <p>
                        Cookie-urile sunt folosite pentru funcționarea corectă a
                        site-ului. De exemplu, pentru a vă menține conectat/ă la
                        contul dvs., pentru a reține elementele din coșul de
                        cumpărături, pentru a reține produsele favorite etc.
                    </p>
                    <br />
                </section>

                <section>
                    <h4 style={{ fontWeight: "bolder" }}>
                        Ce cookie-uri folosim?
                    </h4>
                    <p>
                        Folosim cookie-uri de sesiune și cookie-uri fixe.
                        Cookie-urile de sesiune dispar odată cu închiderea
                        browser-ului, iar cele fixe rămân până când sunt șterse
                        de utilizator manual sau prin intermediul setărilor
                        browser-ului.
                    </p>
                    <br />
                </section>

                <section>
                    <h4 style={{ fontWeight: "bolder" }}>
                        Conțin cookie-urile informații personale?
                    </h4>
                    <p>
                        Cookie-urile nu conțin informații personale sensibile,
                        cum ar fi CNP, parola, adresa etc.
                    </p>
                    <br />
                </section>

                <section>
                    <h4 style={{ fontWeight: "bolder" }}>
                        Cum șterg cookie-urile?
                    </h4>
                    <p>
                        Există mai multe posibilități pentru a șterge datele
                        stocate în cookie-uri:
                    </p>
                    <ol>
                        <li>De la setările browser-ului dvs.</li>
                        <li>
                            Manual, apăsând pe pictograma cu lacăt și apoi pe
                            "Cookies"
                        </li>
                    </ol>
                    <br />
                </section>
            </div>

            <Footer />
        </>
    );
}

export default PrivacyPolicy;
