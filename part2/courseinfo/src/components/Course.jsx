const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Content = ({ parts }) => {
    return (
        <div>{parts.map(part => <Part key={part.id} part={part} />)}</div>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course