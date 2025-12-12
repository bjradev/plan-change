import React, { useEffect, useMemo, useState } from "react";

export default function App() {
  useFadeInOnView();
  const { segment, id } = useUrlParams();
  const { data, loading, error } = usePlansData(segment);
  const selected = useMemo(() => {
    if (!data || !id) return null;
    return data.plans.find((p) => String(p.id) === String(id)) || null;
  }, [data, id]);

  // Force light theme and ensure class is present
  useEffect(() => {
    document.body.classList.add("light-theme");
  }, []);

  return (
    <>
      <main className="container">
        <header className="header fade-in-up">
          <div className="logo-container">
            <img src="/sgf.png" alt="SGF" className="brand-logo-img" />
          </div>
        </header>

        <h2 className="main-title">
          Ajuste de tarifas <span className="highlight">2025</span>
        </h2>

        <section className="card fade-in-up delay-1">
          <div className="alert-badge">Comunicado Importante</div>

          <div className="content-text">
            <p>
              <strong>Estimado Cliente,</strong>
            </p>
            <p>
              Cumpliendo los requisitos de Ley ante la{" "}
              <strong>Comisión Nacional de Telecomunicaciones (CONATEL)</strong>
              , fue aprobada la aplicación con fecha{" "}
              <strong>Diciembre 2025</strong>, la Nueva tarifa que aplica a su
              Plan Actual. De conformidad con el Artículo 15, Numeral 5 de la
              Ley Orgánica de Telecomunicaciones.
            </p>
            <p>
              En <strong>Sisprot Global Fiber</strong>, valoramos su confianza y
              fidelidad. Nuestro compromiso es seguir brindándole un servicio de
              internet de alta calidad, estable y con la mejor tecnología de
              fibra óptica.
            </p>
            <p>
              Agradecemos de antemano su comprensión y reiteramos nuestro
              compromiso de seguir siendo su proveedor de internet preferido.
            </p>

            <div className="pricing-section">
              <h3 className="section-title">Nuevas Tarifas Vigentes</h3>

              {loading && <p>Cargando datos…</p>}
              {error && <p style={{ color: "#f88" }}>Error: {error}</p>}
              {!loading && !error && data && (
                <>
                  <div className="table-container">
                    <table className="pricing-table">
                      <thead>
                        <tr>
                          <th>Plan</th>
                          <th>
                            Tarifa Actual <br />
                            <span className="small-text">(Hasta Nov 2025)</span>
                          </th>
                          <th className="highlight-header">
                            Nueva Tarifa <br />
                            <span className="small-text">(Desde Dic 2025)</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selected ? [selected] : data.plans).map((plan) => (
                          <tr key={plan.id}>
                            <td>{plan.name}</td>
                            <td>${Number(plan.oldPrice).toFixed(2)}</td>
                            <td className="new-price">
                              ${Number(plan.newPrice).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile card layout (shown only on small screens via CSS) */}
                  <div className="cards-container">
                    {(selected ? [selected] : data.plans).map((plan) => (
                      <article className="plan-card" key={plan.id}>
                        <div className="plan-card-header">
                          <span className="plan-label">Tu plan actual</span>
                          <h4 className="plan-card-title">{plan.name}</h4>
                        </div>
                        <div className="plan-card-body">
                          <div className="price-row price-old">
                            <span className="price-label">Tarifa actual</span>
                            <span className="price-period">Hasta Nov 2025</span>
                            <span className="price-value">
                              ${Number(plan.oldPrice).toFixed(2)}
                            </span>
                          </div>
                          <div className="price-row price-new">
                            <span className="price-label">Nueva tarifa</span>
                            <span className="price-period">Desde Dic 2025</span>
                            <span className="price-value">
                              ${Number(plan.newPrice).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="info-note">
              <p>
                • <strong>Importante:</strong> Este ajuste se verá reflejado en
                su facturación a partir del mes de Diciembre de 2025.
              </p>
            </div>

            <div className="whatsapp-invite">
              <p>
                Hacemos extensiva la Invitación a formar parte de nuestro{" "}
                <strong>Canal de WhatsApp</strong> para conocer más sobre
                novedades, premios, mantenimientos programados y de emergencia
                en tiempo real.
              </p>

              <div className="qr-container">
                <img
                  src="/qr-whatsapp.png"
                  alt="Código QR Canal de WhatsApp"
                  className="qr-code"
                />
              </div>

              <a
                href="https://whatsapp.com/channel/0029Vab9DIpEFeXk23mELA2g"
                className="btn-whatsapp"
                target="_blank"
                rel="noreferrer"
              >
                Unirme al Canal
              </a>
            </div>
          </div>

          <div className="cta-section">
            <p>
              Agradecemos por su preferencia y fidelidad continua a Sisprot
              Global Fiber.
            </p>
            <p>
              Igualmente ante cualquier inquietud o preguntas contactar nuestro
              Call Center:
            </p>
            <a
              href="https://wa.me/584120261134"
              className="btn-primary"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Contactar por WhatsApp"
            >
              Contactar: 0412-0261134
            </a>
            <p className="contact-sub">
              Lunes a Lunes | Atentamente, El Equipo de Sisprot Global Fiber
            </p>
          </div>
        </section>
      </main>

      <footer className="footer fade-in-up delay-2">
        <p>
          &copy; 2025 Sisprot Global Fiber, C.A. Todos los derechos reservados.
        </p>
      </footer>
    </>
  );
}

function useFadeInOnView() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll(".fade-in-up");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function useUrlParams() {
  const [params, setParams] = useState({ segment: null, id: null });
  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    // segment can be 'res' or 'pyme'; allow also 'residencial' and 'pymes' synonyms
    let seg = search.get("seg") || search.get("segment") || "";
    seg = seg.toLowerCase();
    if (seg === "residencial") seg = "res";
    if (seg === "pymes" || seg === "pyme") seg = "pyme";
    const id = search.get("id") || null;
    setParams({ segment: seg || null, id });
  }, []);
  return params;
}

function usePlansData(segment) {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });
  useEffect(() => {
    if (!segment) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    const controller = new AbortController();
    const url = `/data/${segment === "res" ? "residencial" : "pyme"}.json`;
    setState({ data: null, loading: true, error: null });
    fetch(url, { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const json = await r.json();
        setState({ data: json, loading: false, error: null });
      })
      .catch((e) => {
        if (e.name === "AbortError") return;
        setState({
          data: null,
          loading: false,
          error: e.message || "Error al cargar datos",
        });
      });
    return () => controller.abort();
  }, [segment]);
  return state;
}
