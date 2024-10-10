"use client";

import { SellProduct, type State } from "@/app/actions";
import { type JSONContent } from "@tiptap/react";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectCategory } from "../SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../Editor";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Submitbutton } from "../Submitbutton";
export function SellForm() {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      redirect("/");
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Sell your product with us!</CardTitle>
        <CardDescription>Please describe your product.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10 ">
        {/* Name of the product */}
        <div className="flex flex-col gap-y-2 fontme">
          <Label className="font-medium">Name</Label>
          <Input
            name="name"
            type="text"
            placeholder="Name your product"
            required
            minLength={3}
          />
          {state?.errors?.["name"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["name"]?.[0]}</p>
          )}
          {/* Choosing the category of the Product */}
          <div className="flex flex-col gap-y-2">
            <Label className="font-medium">Category</Label>
            <SelectCategory />
            {state?.errors?.["category"]?.[0] && (
              <p className="text-destructive">
                {state?.errors?.["category"]?.[0]}
              </p>
            )}
          </div>
          {/* Takes Price from the seller */}
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <CardDescription>In INR</CardDescription>
            <Input
              placeholder="Your price in ₹"
              type="number"
              name="price"
              required
              min={1}
            />
            {state?.errors?.["price"]?.[0] && (
              <p className="text-destructive">
                {state?.errors?.["price"]?.[0]}
              </p>
            )}
          </div>
          {/* Takes description the product */}
          <div className="flex flex-col gap-y-2">
            <Label>Small Description</Label>
            <Textarea
              name="smallDescription"
              required
              minLength={10}
              placeholder="Describe more about your product..."
            />
            {state?.errors?.["smallDescription"]?.[0] && (
              <p className="text-destructive">
                {state?.errors?.["smallDescription"]?.[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-y-2">
            <input
              type="hidden"
              name="description"
              value={JSON.stringify(json) ?? ""}
            />
            <Label>Description</Label>
            <TipTapEditor json={json} setJson={setJson} />
            {state?.errors?.["description"]?.[0] && (
              <p className="text-destructive">
                {state?.errors?.["description"]?.[0]}
              </p>
            )}
          </div>
        </div>

        {/* PRODUCT IMAGES */}
        <div className="flex flex-col gap-y-2">
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <Label>Product Images</Label>
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res.map((item) => item.url));
              toast.success("Your images have been uploaded!");
            }}
            onUploadError={() => {
              toast.error("Action Failed! try again!");
            }}
          />
          {state?.errors?.["images"]?.[0] && (
            <p className="text-destructive">{state?.errors?.["images"]?.[0]}</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-5">
        <Submitbutton title="Create a Product" />
      </CardFooter>
    </form>
  );
}
