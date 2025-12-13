"use client";

import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {DownloadFile} from "@/types/api";
import LogoSpinner from "@/components/logo-spinner";
import DownloadFileView from "@/components/download-file";
import {useApiPublic} from "@/hooks/use-api-public";
import {useSession} from "next-auth/react";
import {OpenBankingContent} from "@/components/open-banking-content";

export default function DppPage() {
  const { call } = useApiPublic();
  const { data: session } = useSession();
  const params = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [downloads, setDownloads] = useState<DownloadFile[] | []>([]);
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const [mdData, downloadData] =
          await Promise.all([
            call("get", `/api/md?slug=${params.slug}`),
            call("get", `/api/download-file?slug=${params.slug}`),
          ]);
        setContent(mdData);
        setDownloads(downloadData);
      } catch (error) {
        console.error("Failed to load hero data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [params?.slug]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center w-full py-10 gap-12 bg-white rounded-xl items-center">
        <LogoSpinner />
      </div>
    );
  }

  return (
    <main className="w-full bg-background">
      <OpenBankingContent markdownContent={content} />

      {session && (
        <div className="pb-10">
          <DownloadFileView downloads={downloads} />
        </div>
      )}
    </main>
  );
}
