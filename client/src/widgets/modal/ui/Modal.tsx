import React, {useEffect, useRef} from "react";

interface Props {
    opened: boolean;
    closeModal: () => void;
}

export function Modal(props: React.PropsWithChildren<Props>) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (props.opened) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [props.opened]);

    return (
        <dialog ref={ref}>
            {props.children}
            <button onClick={props.closeModal}>Close</button>
        </dialog>
    );
}
