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
import RoomType from "./RoomType";

export function DialogComponentRoomType({ data }: any) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button
            type='button'
            className=' px-4 py-1 body-font rounded-md  bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer'>
            {data.propertyName}
          </button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-sm'>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className=' overflow-y-auto max-h-[75vh] pb-12'>
            <RoomType roomTypeData={data} />
          </div>
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
