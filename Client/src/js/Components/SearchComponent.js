var React=require('react');

var SearchComponent=React.createClass({
  getInitialState:function(){
    return({
      SelectOptions:[],
      category:"",
      key:""
    })
  },
  componentDidMount:function(){
    $.ajax({
      url:"http://localhost:8080/user/categories",
      type:'GET',
      dataType:'JSON',
      success:function(data){
        console.log(data);
        this.setState({SelectOptions:data.category});
      }.bind(this),
      error:function(err){
        console.log(err);
      }.bind(this)
    });
  },

  submitHandler: function(){
    var category = this.state.category;
    if(category=='Select')
    {
      category = "";
    }
    var obj={"category":category,"keyword":this.state.key};
    this.props.getNews(obj);
    console.log(obj);
  },
  changeHandler: function(event){
    this.setState({key:event.target.value});
  },
  dropChangeHandler:function(event){
    console.log(event.target.value);
    var category=event.target.value;
    this.setState({category:category});
    console.log(this.state.category);
  },
  render:function(){
    var SelectListArr=this.state.SelectOptions.map(function(option){
      console.log('entering');
      return(<option value={option}>{option}</option>);
    });
    return (
      <div className="container">
      <h1>Search Your News</h1>
      <select className="selectpicker" data-style="btn-primary" id='myList' onChange={this.dropChangeHandler}>
      <option value="Select">List All</option>
      {SelectListArr}
      </select>
      <br/>
      <br/>
      <div className="input-group input-group-lg">
          <input type="text" ref='userName' placeholder="Search a News by Keyword..."  onChange={this.changeHandler} className="form-control"></input>
          <span className="input-group-addon"><button onClick={this.submitHandler} className="btn btn-xs btn-Warning "> Submit </button></span>
      </div>  &nbsp; &nbsp;
      <hr/>
      </div>
    );
  }
});
module.exports=SearchComponent;
