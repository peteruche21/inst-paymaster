import React, { FC } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
  Checkbox,
  Tooltip,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { store } from "../../lib/IPFS";
import { IAAAcount } from "../../pages";
import deploy from "../../lib/deployPaymaster";

interface IProps {
  route: React.Dispatch<React.SetStateAction<string>>;
  account: IAAAcount;
}

const PaymasterForm: FC<IProps> = ({ route, account }) => {
  const hiddenFileInput = React.useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const logoFile = new File(data.logo, `${data.name}`);
    const logoHash = await store(logoFile);
    const uploadeableData = {
      name: data.name,
      logo: logoHash,
      validationAddress: data.validationAddress,
      owner: account.address,
    };
    const ipfsFile = new File(
      [JSON.stringify(uploadeableData)],
      "payamsterMetadata.json",
      {
        type: "application/json",
      }
    );
    const cid = await store(ipfsFile);
    console.log(cid, logoHash);
    // next deploy logic
    const status = await deploy(
      account.EIP712Signer,
      account.address,
      cid,
      data
    );
    status && reset();
  };

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    //@ts-ignore
    hiddenFileInput.current.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("logo", e.target.files);
  };
  return (
    <Card className="shadow-none w-full">
      <div className="absolute z-10 p-2">
        <Tooltip content="go back">
          <Typography as="a" onClick={() => route("paymasters")}>
            <svg
              className="w-6 h-6 text-blue-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </Typography>
        </Tooltip>
      </div>
      <CardHeader
        floated={false}
        variant="gradient"
        color="white"
        className="grid h-12 place-items-center shadow-none"
      >
        <Typography variant="h5" color="blue" className="px-4">
          Deploy New Paymaster
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="name"
            size="lg"
            type="text"
            {...register("name", {
              required: true,
            })}
          />
          <div className="inline-flex justify-around">
            <Button size="sm" variant="gradient" onClick={handleClick}>
              Logo
            </Button>
            <div className="hidden">
              <input
                name="logo"
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                required
              />
            </div>
            <Checkbox
              id="useCustomToken"
              label="use-CustomToken"
              ripple={true}
              {...register("useCustomToken")}
            />
          </div>
          <div className="flex justify-between gap-2">
            <Input
              placeholder="maxNonce"
              size="md"
              type="number"
              {...register("maxNonce")}
              containerProps={{
                style: { minWidth: 0 },
              }}
            />
            <Input
              placeholder="amount"
              size="md"
              type="number"
              {...register("amount")}
              containerProps={{
                style: { minWidth: 0 },
              }}
            />
          </div>
          <Input
            label="tokenAddress"
            size="lg"
            type="text"
            {...register("tokenAddress")}
          />
          <Input
            label="validationAddress"
            size="lg"
            type="text"
            {...register("validationAddress")}
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

export default PaymasterForm;
