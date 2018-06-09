import React from 'react'
const boxShad = "0px 10px 8px 0 rgba(0, 0, 0, 0.2), 5px 10px 20px 5px rgba(0, 0, 0, 0.19)"
const textShad = "2px 2px 4px #000000"

function Square(props){
    return(
        <button className={"btn btn-default ml-2 p-0 "} onClick={props.onClick}  style={{height:"100%", width:"30%", color: "#006600", fontSize:"50px",textShadow: textShad, boxShadow: boxShad}}>
            {props.value}
        </button>
    )
}


class GameBox extends React.Component{
    constructor(){
        super()
        this.state ={playerValue:new Array(9).fill(" "), turn:"0", displayMessage:"Game On!", finished:false}
        
        this.canClick = new Array(9).fill(true)

        this.handleClick=this.handleClick.bind(this)
        this.onClickNewGame = this.onClickNewGame.bind(this)
        this.gameEngiene = this.gameEngiene.bind(this)
        this.renderSquare = this.renderSquare.bind(this)
    }
    renderSquare(n){
        return(
            <Square value={this.state.playerValue[n]} onClick={()=>{this.handleClick(n)}} />
        )
    }
    gameEngiene(playerValye, turn){
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
        let message ="null";
        for(let i=0;i<lines.length;i++){
            const [a,b,c] = lines[i]
            if(playerValye[a] && playerValye[a] === playerValye[b] && playerValye[a] === playerValye[c] && playerValye[a] !== " "){
               this.setState({finished:true})
               message =playerValye[a] + " is the winner!"
            }
        }
        var n = 0
        for(let i=0;i<9;i++){
            if(playerValye[i] === "X" || playerValye[i] === "0") {
                n++;
            }
        }
        if(n===9 && message === "null"){
            this.setState({finished:true})
            message = "Draw!"
        }

        if(message === "null"){
            message = "Next: " + turn 
        }   
        this.setState({displayMessage: message})
    }
    handleClick(n){
        
        const values = this.state.playerValue.slice()
        var turn ;
        if(this.canClick[n]===true){
           if(this.state.turn == "X"){
                values[n] = "X"
                
               // this.state.turn = "0";
             this.setState({turn:"0"})
             turn = "0"
            }
            if(this.state.turn === "0"){
                values[n] = "0"
                
               //  this.state.turn = "X"\
               this.setState({turn:"X"})
               turn="X"
            }
            this.canClick[n] = false
        }
        this.setState({playerValue : values})
        this.gameEngiene(values, turn)
    }
   onClickNewGame(){
        this.setState({playerValue:new Array(9).fill(" "), color:new Array(9).fill("dark"), turn:"0", finished: false})
        this.canClick = new Array(9).fill(true)
        this.setState({displayMessage:"Game On!"})
        this.map = {X:new Array(9).fill(" "), O:new Array().fill(" ")}
        //backgroundColor:"#004d00"
    }
    shouldComponentUpdate(props, state){
        if(this.state.finished){
            return false
        }
        return true
    }
    
    render(){
       // console.log("rendered")
        return(
            <div className="container p-0 bg-dark" style={{margin:"20vh 0 0 40vw", width:"300px", borderRadius:"25px 25px 50px 50px"}}>
               <div className="row p-2 justify-content-center text-light"> 
                    <h3>{this.state.displayMessage}</h3>
                </div>
                <div className="row mb-2 mt-2" style={{height:"100px",}}>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row mb-2" style={{height:"100px"}}>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row mb-2" style={{height:"100px"}}>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                
                <div className = "row justify-content-center bg-dark " style={{borderRadius: "0 0px 25px 25px " ,border: "2px solid #73AD21", padding: "20px",  boxShadow: "2px 2px 10px #000000"}} >
                    <button className="btn mr-5 bg-success text-light" onClick={this.onClickNewGame}>New Game</button>
                    <button className = "btn bg-success text-light"> Restart </button>
                </div>
            </div>
        )
    }
}
export default GameBox