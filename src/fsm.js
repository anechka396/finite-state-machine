class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
		if(config == null) throw new Error();
		this.initial = config['initial']
		this.states = config['states'];
		this.state = this.initial;
		this.doHistory = [];
		this.undoHistory = [];
	}

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
		return this.state;
	}

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
		if (Object.keys(this.states).indexOf(state) === -1) throw new Error();
		this.state = state;
		this.doHistory.push(this.state);
		this.undoHistory = [];
	}

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
		this.changeState(this.states[this.state].transitions[event]);
	}

    /**
     * Resets FSM state to initial.
     */
    reset() {
		this.changeState(this.initial);
		this.doHistory = [];
		this.undoHistory = [];
	}

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
		if (event === undefined) {
			return Object.keys(this.states);
		} else {
			return Object.keys(this.states).filter(state => this.states[state].transitions[event] != null);
		}
	}

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
		if(this.doHistory.length == 0) return false;
		this.undoHistory.push(this.doHistory.pop());
		if(this.doHistory.length > 0) {
			this.state = this.doHistory[this.doHistory.length - 1];
		} else {
			this.state = this.initial;
		}
		return true;
	}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
		if(this.undoHistory.length == 0)  {
			return false;
		} else {
			this.state = this.undoHistory.pop();
			return true;
		}		
	}

    /**
     * Clears transition history
     */
    clearHistory() {
		this.doHistory = [];
		this.undoHistory = [];
	}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
