import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Eth } from "@web3uikit/icons";
import { IAAAcount } from "../../pages";
import send from "../../lib/transfer";

const Transfer = ({ account }: { account: IAAAcount }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
    const success = await send(
      account.EIP712Signer,
      account.address,
      data.To,
      data.Amount
    );
    reset();
    console.log(success);
  };
  return (
    <Card className="m-auto">
      <CardHeader
        floated={false}
        variant="gradient"
        color="white"
        className="grid h-12 place-items-center shadow-none"
      >
        <Typography variant="h5" color="blue" className="px-4">
          Transfer ETH
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-col gap-4">
          <Input
            placeholder="0x...."
            size="lg"
            type="text"
            {...register("To", {
              required: true,
            })}
          />
          <Input
            label="Amount"
            size="lg"
            type="text"
            icon={<Eth />}
            {...register("Amount", {
              required: true,
            })}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth type="submit">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Transfer;
