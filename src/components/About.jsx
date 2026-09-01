import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faRecycle,
  faHandHoldingHeart,
  faEarthAmericas
} from "@fortawesome/free-solid-svg-icons";

const values = [
  {
    icon: faSeedling,
    title: "Origem consciente",
    text: "Selecionamos fornecedores que respeitam o meio ambiente e as pessoas em cada etapa da produção."
  },
  {
    icon: faRecycle,
    title: "Embalagens sustentáveis",
    text: "Materiais reciclados e recicláveis, sempre reduzindo o plástico ao mínimo possível."
  },
  {
    icon: faHandHoldingHeart,
    title: "Impacto social",
    text: "Apoiamos pequenos produtores e cooperativas que compartilham nossos valores."
  },
  {
    icon: faEarthAmericas,
    title: "Compromisso com o planeta",
    text: "Parte do nosso lucro é revertida em projetos de reflorestamento e educação ambiental."
  }
];

function About() {
  return (
    <section id="about" className="about-section">
      <div className="section-title">
        <div>
          <span>QUEM SOMOS</span>
          <h2>Sobre nós</h2>
        </div>
      </div>

      <div className="about-content">
        <p className="about-text">
          A EcoTrend nasceu com um propósito simples: mostrar que é possível
          consumir de forma consciente sem abrir mão de qualidade e estilo.
          Reunimos produtos sustentáveis, de origem verificada, para que cada
          compra seja também um passo em direção a um futuro melhor para o
          planeta.
        </p>

        <p className="about-text">
          Acreditamos que pequenas escolhas do dia a dia, somadas, têm o
          poder de gerar grandes mudanças. Por isso, trabalhamos lado a lado
          com produtores locais e marcas comprometidas com práticas
          ambientais e sociais responsáveis.
        </p>
      </div>

      <div className="about-values">
        {values.map((value) => (
          <div className="about-card" key={value.title}>
            <div className="about-card-icon">
              <FontAwesomeIcon icon={value.icon} />
            </div>

            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;
