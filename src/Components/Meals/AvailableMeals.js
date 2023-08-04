import { useEffect,useState } from 'react';
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals=()=>{
  const[meals,setMeals]=useState([]);
  const[isloading,setisLoading]=useState(true);

  useEffect(()=>{
    const fetchMeals = async()=>{
    const response= await fetch('https://foodorderapp-78d7e-default-rtdb.firebaseio.com/reactmeals/meals.json');

    if(!response.ok){
      throw new Error('Something went wrong');
    }

    const responseData= await response.json()

    const loadedMeals=[];

    for (const key in responseData){
      loadedMeals.push({
        id: key,
        name: responseData[key].name,
        description: responseData[key].description,
        price: responseData[key].price,
      });
    }
    setMeals(loadedMeals);
    };

  fetchMeals()
  setisLoading(false);

  },[]);

  if(isloading){
    return(
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

    const mealsList=meals.map((meal)=> 
        <li>
            <MealItem 
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
            />
        </li>);

    return <section className={classes.meals}>
        <Card>
            <ul>{mealsList}</ul>
        </Card>
        </section>
}

export default AvailableMeals;