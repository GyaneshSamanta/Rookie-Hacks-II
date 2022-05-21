import { DashboardHeroProps } from "../../utils/interfaces/dashboard-interfaces";
import { DashboardCard } from ".";

const DashboardHero = ({ associations }: DashboardHeroProps) => {
  return (
    <section>
      <div className="bg-hedera-secondary text-white py-36 px-48">
        <h1 className="text-5xl font-bold">Welcome [name]</h1>
        <h6 className="text-hedera-purple text-xl font-light mt-8">
          Lets see something
        </h6>
      </div>

      <p className="bg-gradient-to-r text-center text-xl text-white py-10 hedera-primary font-medium">
        Nulla veniam irure commodo duis officia aliquip irure ea nostrud.
      </p>

      <div className="grid grid-cols-3 w-10/12 mx-auto mt-20 justify-center items-start">
        {associations.map((association) => (
          <DashboardCard
            key={Object.keys(association)[0]}
            association={association}
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardHero;
