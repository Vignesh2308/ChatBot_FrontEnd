import React from 'react';
import data from "./data.json";

class Home extends React.Component{

    constructor(){
        super();
        this.state = {
            suggestion: [],
            message_list : [],
            id:0,
            value:'Start Chat with Bot',
        }
    }

    initiate = (e) =>{
        e.preventDefault();
        // console.log(e.target.id);
        this.setState({suggestion: ["About me", "My Skills"]});
        this.setState({message_list:[...this.state.message_list, "bot:Greetings..!! Welcome to Resume Chat Bot Application..!! Please Select Below to know relevant Information."]});
        this.setState({value:"Please Select from Below"}); 
        document.getElementById("input").disabled=true;
    }

    chat = (e) =>   {
        e.preventDefault();
        // console.log(e.target.id);
        var a = document.getElementById(e.target.id).innerHTML;
        // console.log(a);

        if (a === 'Go Back'){
            data.map(s => {
                if(s.id === this.state.id-1){
                    this.setState({suggestion: s.options});
                    // console.log("Here"+s.id);
                    this.setState({id: this.state.id-1});
                }
                return null;   
                });
                
        }

        else{
        data.map(s => {
            if(s.answer === a){
                this.setState({message_list:[...this.state.message_list, "user:"+a, "bot:"+s.question]});
                this.setState({suggestion: s.options});
                this.setState({id: s.id});
                // console.log(s.id);
                
            }
            
            return null;   
            });
            
        }
        
    }

    render(){
        return(
            <>
            <div className='Heading'>
               RESUME CHAT BOT APPLICATION
            </div>

            <div className='Chatbox' id='Chatbox'>
                <div className='chat-box-heading'>
                    Chat with Bot
                </div>
                <div className='scroll' id="scroll"> 
                    <img src='https://static.vecteezy.com/system/resources/previews/000/134/464/original/free-people-silhouettes-party-dance-vector.jpg' alt='Event' className='gif'/>
                
                    
                    {this.state.message_list.map((mess, index) => {
                        var message = mess.split(":");
                        // console.log(message);
                        if(message[0] === "bot"){
                            // console.log("bot");
                        return(
                            <div className='message-out' key={index}>
                                {message[1]}
                            </div>
                        );}

                        if(message[0] === "user"){
                            return(
                                <div className='message-in' key={index}>
                                    {message[1]}
                                </div>
                            );
                        }
                        return null;
                    } )}
                    
                    
                </div>
                
                <div className='search'>
                    <input type='button' onClick={this.initiate} value={this.state.value} id='input'/>
                    {/* <input type='button' id='button' value='Send'/> */}
                </div>
                
                {this.state.suggestion.map((suggest, index) => {
                    
                    return(
                <button onClick={this.chat} key={index} className='footer' >         
                        <div className='suggestion' id={index+1} value={suggest}>
                            {suggest}
                        </div>
                </button>);
                
                }
                )}
            </div>

            </>
        );
    }
}

export default Home;