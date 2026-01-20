import { ServiceArea } from '@/lib/templates/types';

interface BasicServiceAreasProps {
  serviceAreas: ServiceArea[];
}

export default function BasicServiceAreas({ serviceAreas }: BasicServiceAreasProps) {
  if (serviceAreas.length === 0) {
    return null;
  }

  return (
    <section id="area" className="basic-area">
      <div className="basic-area__content">
        <div className="basic-section-title">
          <h2>Service Area</h2>
          <p>Proudly serving these communities</p>
        </div>
        <ul className="basic-area__list">
          {serviceAreas.map((area) => (
            <li key={area.id}>
              <strong>{area.name}</strong>
              {area.description && (
                <p>{area.description}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
