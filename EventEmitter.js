
/**
 *EventEmitter - storing info about listeners and inform about new events
 *
 */
function EventEmitter() {
    this._listeners = {};
}

_p = EventEmitter.prototype;

/**
 * save function as an event listener
 * @param type - event type
 * @param listener - function to save as an event listener 
 * 
 */

_p.addListener = _p.on = function(type, listener){
    if (typeof listener !== "function") {
        throw("Listener have to be a function")
    }
    if (!this._listeners[type]) {
        this._listeners[type] = [];
    }
    this._listeners[type].push(listener)
};

/** 
 * remove function which was event listener
 * @param type - event type
 * @param listener - function to remove
 */

 _p.removeListener = function(type, listener){
     if (typeof listener !== "function") {
        throw("Listener have to be a function")
     }
     if (!this._listeners[type]) {
         return
     }
     let position = this._listeners[type].indexOf(listener);
     if (position != -1) {
         this._listeners[type].splice(position, 1);
     }
 }

 /**
  * remove all functions which are event listeners for type
  * @param type - event type
  */

  _p.removeAllListeners = function(type){
      if (type) {
          this._listeners[type] = [];
      } else {
          this._listeners = {};
      }
  }

  /**
   * inform all event listeners about event occurence
   * @param type - event type
   * @param event - event object 
   */

   _p.emit = function(type, event){
       if (!(this._listeners[type] && this._listeners[type].length)) {
           return
       }

       for (let i = 0; i < this._listeners[type].length; i++) {
           this._listeners[type][i].apply(this, event);           
       }
   }