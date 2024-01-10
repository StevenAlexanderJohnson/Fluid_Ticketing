export default function GradientText({text, header} : {text: string, header?: boolean}) {
    return (
        <span className={"text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent-light dark:from-primary-dark dark:to-accent-dark " + (header ? 'font-bold text-6xl' : '')}>
            {text}
        </span>
    )
};