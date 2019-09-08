import './App.css';
import RecipeList from './components/RecipeList';
import RecipDetails from './components/RecipeDetails';
import {recipes} from "./temp";
import React, { Component } from 'react'

 class App extends Component {
   state = {
      recipes:recipes,
      //recipes: [],
      url : "https://www.food2fork.com/api/search?key=294dd1f47d6fb0a7acc80ec37408554f&q=chicken%20breast&page=2",
      details_id:28676,
      pageIndex: 1,
      search: ""
   };
   async getRecipes(){
     try{
          const data = await fetch(this.state.url);
          const jsonData = await data.json();
          this.setState({
            recipes : jsonData.recipes
          });
     }catch{
       console.error();
       
     }
   }
     componentDidMount(){
       this.getRecipes();
     }
   displayPage = index => {
     switch(index){
       default:
         case 1:
           return <RecipeList recipes={this.state.recipes} handleDetails={this.handleDetails} value={this.state.search} 
           handleChange = {this.handleChange} handleSubmit={this.handleSubmit}
           />;
         case 0:
         return  <RecipDetails id={this.state.details_id} handleIndex={this.handleIndex} />;
     }
   }
   handleIndex = index => {
     this.setState({
       pageIndex:index
     });

   };
   handleDetails = (index,id) => {
     this.setState({
       pageIndex:index,
       details_id : id
     })
   }
   handleChange = e => {
     this.setState({
       search:e.target.value
     },
     ()=>{
       console.log(this.state.search);
     })
   } 
   handleSubmit = (e) => {
     e.preventDefaul();
     const {base_url,query,search} = this.state;
     this.setState( () => {
       return {url:`${base_url}${query}${search}`,search:""};
     },
     ()=>{
       this.getRecipes();
     });
   };
  render() {
    //console.log(this.state.recipes);
    return (
      <React.Fragment>{this.displayPage(this.state.pageIndex)}
    </React.Fragment>
    )
  }

}


export default App;
