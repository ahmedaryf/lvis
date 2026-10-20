import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogComponent({ children }: any) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button
            type='button'
            className=' px-4 py-1 body-font rounded-md  bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer'>
            Inquiry Form
          </button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>{children}</div>
          <DialogFooter>
            <DialogClose className='body-font text-red-600 cursor-pointer mt-4'>
              Cancel
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
