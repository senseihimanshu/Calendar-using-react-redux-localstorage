import {combineReducers} from 'redux';

var initialState = {
    reminders: {}
};

// const EditNoteReducer = (storeRoom, action) => {
//     if(action.type === 'DELETE_NOTE'){
//         return action.payload;
//     }
//     // } else if(action.type === 'EDIT_NOTE'){
//     //     // ret
//     // }
// }

// const ViewNoteReducer = () => {

// }

const addNoteReducer = (state = initialState, action) => {
    if(action.type === 'ADD_NOTE'){
        let {key, note, time} = action.payload;
        console.log(state);
        // console.log(key, note, time);
        if (!(key in state.reminders)){
            state.reminders =  {
                ...state.reminders,
                [key]: [{note, time}]
            }
        }   
        else{
            state.reminders = {
                ...state.reminders,
                [key]: [...state.reminders[key], {note, time}]
            }
        }
    }
    initialState = state;
    return state;
}

const editNoteReducer = (state=initialState, action) => {
    if(action.type === 'EDIT_NOTE'){
        let {key, note, time, oldTime} = action.payload;
        console.log('REDUCER!!!', key, state.reminders[key], note, time, state);

        let newArr = state.reminders[key].filter((obj)=>{
            console.log(obj);
            return obj.time !== oldTime;
        });

        console.log(newArr);

        state.reminders = {
            ...state.reminders,
            [key]: [...newArr, {note, time}]
        };
    }
    state = initialState;
    return state;
}

// export default addNoteReducer;

const combinedReducers = combineReducers({
    addNote: addNoteReducer,
    editNote: editNoteReducer
});

export default combinedReducers;