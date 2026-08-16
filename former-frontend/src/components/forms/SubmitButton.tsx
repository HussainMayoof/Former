interface Props {
    label: string;
}

const SubmitButton = ({ label }: Props) => {
    return (
        <button type="submit" className="btn btn-primary">
            {label}
        </button>
    );
};

export default SubmitButton;
