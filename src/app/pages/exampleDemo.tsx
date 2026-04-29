import React, { useEffect, useMemo, useState } from "react";
import UTIF from "utif";
import { Spinner } from "../components/Spinner";
import {
  ArrowLeft,
  ChevronDown,
  CircleHelp,
  Combine,
  Download,
  Eraser,
  Expand,
  LayoutDashboard,
  MousePointer2,
  Pencil,
  Scissors,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../components/ui/avatar";

export function ExampleDemo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [reportImage, setReportImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<
    "select" | "cut" | "erase" | "extend" | "merge"
  >("select");

  const navigate = useNavigate();

  const caseId = "105123";

  const revokeIfBlobUrl = (maybeUrl: string | null) => {
    if (!maybeUrl) return;
    if (maybeUrl.startsWith("blob:")) {
      URL.revokeObjectURL(maybeUrl);
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Clear previous results when new file is selected
    revokeIfBlobUrl(preview);
    revokeIfBlobUrl(resultImage);
    revokeIfBlobUrl(reportImage);

    setResultImage(null);
    setReportImage(null);
    setSelectedFile(file);

    // If not TIFF -> normal preview
    if (
      !file.name.toLowerCase().endsWith(".tif") &&
      !file.name.toLowerCase().endsWith(".tiff")
    ) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      return;
    }

    // TIFF handling
    const buffer = await file.arrayBuffer();
    const ifds = UTIF.decode(buffer);
    UTIF.decodeImage(buffer, ifds[0]);

    const rgba = UTIF.toRGBA8(ifds[0]);
    const canvas = document.createElement("canvas");
    canvas.width = ifds[0].width;
    canvas.height = ifds[0].height;

    const ctx = canvas.getContext("2d");
    const imageData = ctx?.createImageData(canvas.width, canvas.height);
    if (imageData && ctx) {
      imageData.data.set(rgba);
      ctx.putImageData(imageData, 0, 0);
    }

    const pngUrl = canvas.toDataURL("image/png");
    setPreview(pngUrl);
  };

  const onsubmit = async (): Promise<string | null> => {
    if (!selectedFile) {
      alert("Please select a file first");
      return null;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8000/api/predict/get_detections",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }
      
      const imageBlob = await response.blob();
      
      
      if (imageBlob.size === 0) {
        throw new Error("Response blob is empty");
      }
      
      const imageUrl = URL.createObjectURL(imageBlob);
      setResultImage(imageUrl);
      return imageUrl;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      
      alert(`Detection failed: ${errorMsg}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (): Promise<string | null> => {
    if (!selectedFile) {
      alert("Please select a file first");
      return null;
    }

    try {
      const formData = new FormData();
      formData.append( "image", selectedFile as File);

      setLoading(true);

      // Send to backend
      const classifyResponse = await fetch(
        "http://localhost:8000/api/predict/get_classifications",
        {
          method: "POST",
          body: formData,
        }
      );
      
      if (!classifyResponse.ok) {
        const errorText = await classifyResponse.text();
        throw new Error(`HTTP ${classifyResponse.status}: ${errorText}`);
      }
      
      const reportBlob = await classifyResponse.blob();
      const reportUrl = URL.createObjectURL(reportBlob);
      setReportImage(reportUrl);
      return reportUrl;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Classification Error:", errorMsg);
      alert(`Classification failed: ${errorMsg}`);
      return null;
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      revokeIfBlobUrl(preview);
      revokeIfBlobUrl(resultImage);
      revokeIfBlobUrl(reportImage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chromosomeSlots = useMemo(() => {
    const autosomes = Array.from({ length: 22 }, (_, i) => String(i + 1));
    return [...autosomes, "X", "Y"];
  }, []);

  const ensureReportReady = async (): Promise<string | null> => {
    if (!selectedFile) {
      alert("Please select a file first");
      return null;
    }

    const detectionUrl = resultImage ?? (await onsubmit());
    if (!detectionUrl) return null;

    const reportUrl = reportImage ?? (await generateReport());
    if (!reportUrl) return null;

    return reportUrl;
  };

  const handleExportReport = async () => {
    const reportUrl = await ensureReportReady();
    if (!reportUrl) return;

    const a = document.createElement("a");
    a.href = reportUrl;
    a.download = `Case_${caseId}_Karyotype_Report.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
 

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top App Bar */}
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="grid size-8 place-items-center rounded-md bg-muted text-foreground">
                <LayoutDashboard className="size-4" />
              </div>
              <span className="text-base font-semibold">KaryoType</span>
            </div>

            <nav className="hidden items-center gap-1 md:flex">
              <Button variant="ghost" className="text-muted-foreground">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-foreground">
                Cases
              </Button>
              <Button variant="ghost" className="text-muted-foreground">
                Reports
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Help">
              <CircleHelp className="size-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="size-7">
                    <AvatarFallback className="text-xs">A</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm md:inline">Admin</span>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              onClick={() => void handleExportReport()}
              disabled={loading || !selectedFile}
            >
              <Download className="size-4" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        {/* Case Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              aria-label="Back"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="size-4" />
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Case #{caseId}</span>
              <Button variant="ghost" size="icon" aria-label="Edit case">
                <Pencil className="size-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left: Uploaded Image + Tools */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-sm font-semibold">Uploaded Image</CardTitle>
                  <CardDescription className="text-xs">
                    {selectedFile ? selectedFile.name : "Select an image to begin"}
                  </CardDescription>
                </div>

                {/* Hidden input keeps the UI clean like the mock */}
                <div>
                  <input
                    id="karyo-upload"
                    type="file"
                    name="image"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,.tif,.tiff"
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-5 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className={
                    "h-14 flex-col gap-1" +
                    (activeTool === "select" ? " bg-accent" : "")
                  }
                  onClick={() => setActiveTool("select")}
                >
                  <MousePointer2 className="size-4" />
                  <span className="text-xs">Select</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className={
                    "h-14 flex-col gap-1" + (activeTool === "cut" ? " bg-accent" : "")
                  }
                  onClick={() => setActiveTool("cut")}
                >
                  <Scissors className="size-4" />
                  <span className="text-xs">Cut</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className={
                    "h-14 flex-col gap-1" +
                    (activeTool === "erase" ? " bg-accent" : "")
                  }
                  onClick={() => setActiveTool("erase")}
                >
                  <Eraser className="size-4" />
                  <span className="text-xs">Erase</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className={
                    "h-14 flex-col gap-1" +
                    (activeTool === "extend" ? " bg-accent" : "")
                  }
                  onClick={() => setActiveTool("extend")}
                >
                  <Expand className="size-4" />
                  <span className="text-xs">Extend</span>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className={
                    "h-14 flex-col gap-1" +
                    (activeTool === "merge" ? " bg-accent" : "")
                  }
                  onClick={() => setActiveTool("merge")}
                >
                  <Combine className="size-4" />
                  <span className="text-xs">Merge</span>
                </Button>
              </div>

              <label
                htmlFor="karyo-upload"
                className="group relative flex h-[420px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border bg-background"
              >
                {preview || resultImage ? (
                  <img
                    src={resultImage ?? preview ?? ""}
                    alt="Uploaded"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-muted">
                      <Download className="size-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG, TIFF</p>
                  </div>
                )}

                {loading && (
                  <div className="absolute inset-0 grid place-items-center bg-background/70">
                    <Spinner />
                  </div>
                )}
              </label>
            </CardContent>

            <CardFooter className="border-t">
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Tool: {activeTool}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{selectedFile ? "Ready" : "No file selected"}</span>
                </div>

                <div className="flex w-full gap-2 sm:w-auto">
                  <Button
                    type="button"
                    variant="secondary"
                    className="flex-1 sm:flex-none"
                    onClick={() => void onsubmit()}
                    disabled={loading || !selectedFile}
                  >
                    Run Analysis
                  </Button>

                  <Button
                    type="button"
                    className="flex-1 sm:flex-none"
                    onClick={() => void generateReport()}
                    disabled={loading || !selectedFile}
                  >
                    Classify
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>

          {/* Right: Karyotype Report */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">Karyotype Report</CardTitle>
            </CardHeader>

            <CardContent>
              {reportImage ? (
                <div className="flex h-[520px] items-center justify-center overflow-hidden rounded-xl border bg-background">
                  <img
                    src={reportImage}
                    alt="Karyotype Report"
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="rounded-xl border bg-background p-4">
                  <div className="grid grid-cols-5 gap-6">
                    {chromosomeSlots.map((slot) => (
                      <div key={slot} className="flex flex-col items-center gap-2">
                        <div className="h-20 w-full rounded-md bg-muted" />
                        <Separator className="w-full" />
                        <span className="text-xs text-muted-foreground">{slot}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="border-t">
              <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
                <span>Total Chromosomes: 44</span>
                <span>Autosomes: 44</span>
                <span>Sex Chromosomes: XY</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}