import EventForm from './EventForm';
import QuizForm from './QuizForm';
import UserEventAndQuizForm from './UserEventAndQuizForm';

export default function ProfileLeft({ setIsQuizForm, setIsEventForm, isEventForm, isQuizForm }) {
    return (
        <div>
            {(isEventForm && !isQuizForm) && (
                <EventForm
                    title={"Events"}
                    setSeeAll={setIsEventForm}
                />
            )}
            {(isQuizForm && !isEventForm) && (
                <QuizForm
                    title={"Quizzes"}
                    setSeeAll={setIsQuizForm}
                />
            )}
            {(!isEventForm && !isQuizForm) && (
                <UserEventAndQuizForm
                    setIsQuizForm={setIsQuizForm}
                    setIsEventForm={setIsEventForm}
                />
            )}
        </div>
    )
}

// {
//     isQuizForm || isEventForm ? (
//         <>
//             {isEventForm && (
//                 <EventForm
//                     title={"My Event"}
//                     setSeeAll={setIsEventForm}
//                 />
//             )}
//             {isQuizForm && (
//                 <QuizForm
//                     title={"My Quizs"}
//                     setSeeAll={setIsQuizForm}
//                 />
//             )}
//         </>
//     ) : (
//     <UserEventAndQuizForm
//         setIsQuizForm={setIsQuizForm}
//         setIsEventForm={setIsEventForm}
//     />
// )
// }