const DietaryRestrictions = () => {
  const data ={}
  const restrictions = dietaryRestrictions.split(", ");

  return (
    <div>
      <h2 className="text-2xl font-medium mb-2">Dietary Restrictions</h2>
      <ul className="list-disc list-inside">
      {options.map((option, i) => (
          <li key={i} className="mb-1">
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DietaryRestrictions;
