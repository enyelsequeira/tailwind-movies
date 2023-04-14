"use client";
import { IconPlayerPlay } from "@tabler/icons-react";
import Text from "../ui/typography";
import Button from "../ui/button";

import { useRef, useState } from "react";
import Modal from ".";

type Props = {
  movie: {
    title: string;
    video: string;
    id: number;
  };
};
const ModalComponentClient = ({ movie }: Props) => {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(!open)}>
        <Text>Trailer</Text>
        <IconPlayerPlay />
      </Button>
      <Modal
        open={open}
        setOpen={setOpen}
        cancelButtonRef={cancelButtonRef}
        movie={movie}
      />
    </>
  );
};

export default ModalComponentClient;
