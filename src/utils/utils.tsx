export const handleChange =
    (e: React.ChangeEvent<HTMLInputElement>, stateDispatch: React.Dispatch<React.SetStateAction<any>>) => {
        const { name, value } = e.target;
        stateDispatch((prev: any) => ({
            ...prev,
            [name]: value
        }));
    }