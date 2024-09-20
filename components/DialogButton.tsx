import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"

export function DialogButton() {
  return (
    <div>
    <Dialog>
      <DialogTrigger asChild className="">
        <Button  className="bg-transparent  rounded-lg  hover:text-white hover:bg-transparent border hover:bg-primary border-primary text-black">I am a Doctor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
             Choose one option please!
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
            <div className="w-full flex justify-between text-white">
            <Link className={ buttonVariants({
                variant:'default'
            }) } href={'/doctor-form'} type="submit"> I am new hare! </Link>
          <Link  className={ buttonVariants({
                variant:'default'
            }) } href='/my-all-appointment' type="submit"> I have already account</Link>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}
