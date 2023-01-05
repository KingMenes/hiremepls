import "./SectionCard.css";

function SectionCard({ children, className, img, header, subtitle, desc }) {
  return (
    <div className={`${className} sectioncard`}>
      <h2>{header}</h2>
      <img src={img} alt="" />
      <h3>{subtitle}</h3>
      <p> {desc}</p>
      {children}
    </div>
  );
}

export default SectionCard;
