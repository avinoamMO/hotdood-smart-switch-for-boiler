import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class AddSchdueleMenu extends Component{
    render(){
        return(
        <div className="AddSchduelePopUpMenu">            
                <div className="AddSchduelePopUpMenuContents">            
                <p/>        
                ON: <input type="Time"/> for: <input type="Number" min={1} max={999}/> min
        
                <p/>
                Every:
                <p/>

                <label>
                <input type="checkbox" name={"this.props.name"} onClick={"this.markAsRead"} />
                <span>Sunday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"this.props.name"} onClick={"this.markAsRead"} />
                <span>Monday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"this.props.name"} onClick={"this.markAsRead"} />
                <span>Tuesday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"this.props.name"} onClick={"this.markAsRead"} />
                <span>Wednsday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"this.props.name"} onClick={"this.markAsRead"} />
                <span>Thursday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"this.props.name"} onClick={"this.markAsRead"} />
                <span>Friday</span>
                </label><p/>
                <label>
                <input type="checkbox" name={"this.props.name"} onClick={"this.markAsRead"} />
                <span>Saturday</span>
                </label><p/>
                </div>
                <p/>
                <center><button>Add</button><button onClick={this.props.closePopUp}>Cancel</button></center>
                
        </div>)
    }
}