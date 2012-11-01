/* dom-ready function
 * emulates jQuery.ready() behavior -- without jQuery
 * (c) 2012 David (daXXog) Volm
 * Released under Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0.html  
 */

r = function(f) {
    var t = (typeof r.s != 'undefined'); //if stack exists
    var g = (typeof f != 'undefined'); //if function exists
    
    if(!t) { //if stack does not exist
        r.s = []; //create it
    }
    if(typeof r.r == 'undefined') { //if is running checker undefined
        r.r = false; //set is running checker to "running"
    }
    
    if(document.readyState=="complete") { //it is now ready
        if(t) { //if stack exists
            var c = r.s; //copy the stack to local memory
            r.s = []; //clear the stack
            
            for(var i=0;i<c.length;i++) { //loop through the stack
                c[i](); //run each function
            }
            
            r.r = false; //set is running checker to "not running"
        }
        
        if(g) { //if function exists
            f(); //run function
        }
    } else {
        if(g) { //if function exists
            r.s.push(f); //push the function onto the stack
            
            if(!r.r) { //if is not running
                r.r = true; //set is running checker to "running" 
                window.setTimeout(r, 10); //run
            }
        } else if(r.r) { //else if is running
            window.setTimeout(r, 10); //loop
        }
    }
}