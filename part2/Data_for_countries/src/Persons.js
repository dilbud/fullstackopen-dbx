export const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons
        ?.filter((p) => {
          if (!!!filter || filter?.length === 0) {
            return true;
          }
          return !!p?.name?.toUpperCase().match(filter?.toUpperCase());
        })
        .map(({ name, number, id }) => (
          <p key={id}>{`${name} ${number}`}</p>
        ))}
    </div>
  );
};
