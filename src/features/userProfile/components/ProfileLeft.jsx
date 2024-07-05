import { useState } from 'react';
import EventForm from './EventForm';
import QuizForm from './QuizForm';
import UserEventAndQuizForm from './UserEventAndQuizForm';
import { useEffect } from 'react';
import eventApi from '../../../api/event';
import { useParams } from 'react-router-dom';
import questionApi from '../../../api/question';

export default function ProfileLeft({ setIsQuizForm, setIsEventForm, isEventForm, isQuizForm }) {
    const { userId } = useParams()
    const [userEvents, setUserEvents] = useState([])
    const [userQuesitons, setUserQuestions] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const events = await eventApi.getEventByUserId(+userId)
                setUserEvents(events.data.events)
                const questions = await questionApi.getQuestionByUserId(+userId)
                setUserQuestions(questions.data.questions)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [userId])


    return (
        <div className='overflow-auto h-full'>
            {(isEventForm && !isQuizForm) && (
                <EventForm
                    title={"Events"}
                    setSeeAll={setIsEventForm}
                    events={userEvents}
                />
            )}
            {(isQuizForm && !isEventForm) && (
                <QuizForm
                    title={"Quizzes"}
                    setSeeAll={setIsQuizForm}
                    questions={userQuesitons}
                />
            )}
            {(!isEventForm && !isQuizForm) && (
                <UserEventAndQuizForm
                    setIsQuizForm={setIsQuizForm}
                    setIsEventForm={setIsEventForm}
                    questions={userQuesitons}
                    events={userEvents}
                />
            )}
        </div>
    )
}