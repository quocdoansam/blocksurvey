import { Copy, Link, QrCodeIcon, Save } from "lucide-react";
import QRImage from "../QRImage";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";

const ShareWrapper = () => {
  return (
    <Card className='w-full md:max-w-lg'>
      <CardHeader>
        <CardTitle>Share this survey</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className='flex gap-4'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <Link /> Share Link
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Share link</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className='flex items-center space-x-2'>
              <div className='grid flex-1 gap-2'>
                <Label htmlFor='link' className='sr-only'>
                  Link
                </Label>
                <Input id='link' defaultValue={window.location.href} readOnly />
              </div>
              <Button type='submit' size='sm' className='px-3'>
                <span className='sr-only'>Copy</span>
                <Copy />
              </Button>
            </div>
            <DialogFooter className='sm:justify-start'>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>
              <QrCodeIcon /> QR Code
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>QR Code</DialogTitle>
              <DialogDescription>
                Anyone scanning this QR Code will be able to see this.
              </DialogDescription>
            </DialogHeader>
            <div className='flex items-center space-x-2'>
              <QRImage value={window.location.href} />
            </div>
            <DialogFooter className='sm:justify-start'>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Close
                </Button>
              </DialogClose>
              <Button asChild>
                <a href={window.location.href} download={"qr-code.png"}>
                  <Save /> Save image
                </a>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ShareWrapper;
