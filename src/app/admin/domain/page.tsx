"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Globe, Copy, ExternalLink, CheckCircle2, AlertCircle, Server, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const VERCEL_DOMAIN = "studyvers.vercel.app"

const DNS_RECORDS = [
  {
    type: "A",
    name: "@",
    value: "76.76.21.21",
    ttl: "14400",
    description: "Points your root domain (e.g. studyverse.online) to Vercel",
  },
  {
    type: "CNAME",
    name: "www",
    value: "cname.vercel-dns.com",
    ttl: "14400",
    description: "Points the www subdomain to Vercel",
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 px-2 text-zinc-400 hover:text-white"
      onClick={handleCopy}
    >
      {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
    </Button>
  )
}

export default function DomainPage() {
  const [customDomain, setCustomDomain] = useState("")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Domain & DNS</h1>
        <p className="text-zinc-400">View DNS configuration details and connect a custom domain.</p>
      </div>

      {/* Current Deployment */}
      <Card className="border-white/10 bg-zinc-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Current Deployment</CardTitle>
          </div>
          <CardDescription>Your site is currently live at this URL.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-400">Live</p>
              <a
                href={`https://${VERCEL_DOMAIN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-white hover:text-primary transition-colors"
              >
                https://{VERCEL_DOMAIN}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <CopyButton text={`https://${VERCEL_DOMAIN}`} />
              <a
                href={`https://${VERCEL_DOMAIN}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm" className="h-7 px-2 text-zinc-400 hover:text-white">
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DNS Records */}
      <Card className="border-white/10 bg-zinc-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            <CardTitle>Required DNS Records</CardTitle>
          </div>
          <CardDescription>
            Add these records in your domain registrar (Hostinger, GoDaddy, Namecheap, etc.) to connect a custom domain.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-white/5 bg-black/30 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 bg-white/5">
                  <th className="px-4 py-3 font-semibold text-zinc-300">Type</th>
                  <th className="px-4 py-3 font-semibold text-zinc-300">Name</th>
                  <th className="px-4 py-3 font-semibold text-zinc-300">Value / Points To</th>
                  <th className="px-4 py-3 font-semibold text-zinc-300">TTL</th>
                  <th className="px-4 py-3 font-semibold text-zinc-300"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {DNS_RECORDS.map((record, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-bold text-primary border border-primary/20">
                        {record.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-white">{record.name}</td>
                    <td className="px-4 py-3 font-mono text-white">{record.value}</td>
                    <td className="px-4 py-3 text-zinc-500">{record.ttl}</td>
                    <td className="px-4 py-3 text-right">
                      <CopyButton text={record.value} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-3">
            {DNS_RECORDS.map((record, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-zinc-500">
                <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                <span><strong className="text-zinc-400">{record.type} ({record.name})</strong>: {record.description}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Connect Custom Domain Guide */}
      <Card className="border-white/10 bg-zinc-900/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <CardTitle>Connect Custom Domain</CardTitle>
          </div>
          <CardDescription>
            Follow these steps to link your custom domain (e.g. studyverse.online) with Hostinger.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step-by-step guide */}
          <div className="space-y-4">
            <Step number={1} title="Log in to Hostinger">
              Go to{" "}
              <a href="https://hpanel.hostinger.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                hpanel.hostinger.com
              </a>{" "}
              and select your domain.
            </Step>

            <Step number={2} title="Open DNS Settings">
              Navigate to <strong className="text-white">Domains</strong> &rarr; select your domain &rarr; click{" "}
              <strong className="text-white">DNS / Nameservers</strong> in the sidebar.
            </Step>

            <Step number={3} title="Remove Existing Conflicting Records">
              If there are existing <strong className="text-white">A</strong> records for <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-primary">@</code> or{" "}
              <strong className="text-white">CNAME</strong> records for <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-primary">www</code>, delete or edit them.
            </Step>

            <Step number={4} title="Add A Record">
              <div className="mt-2 flex items-center gap-2 rounded-md bg-black/50 border border-white/10 px-3 py-2 font-mono text-sm">
                <span className="text-zinc-500">Type:</span> <span className="text-white">A</span>
                <span className="text-zinc-700 mx-1">|</span>
                <span className="text-zinc-500">Name:</span> <span className="text-white">@</span>
                <span className="text-zinc-700 mx-1">|</span>
                <span className="text-zinc-500">Points to:</span> <span className="text-primary">76.76.21.21</span>
                <CopyButton text="76.76.21.21" />
              </div>
            </Step>

            <Step number={5} title="Add CNAME Record">
              <div className="mt-2 flex items-center gap-2 rounded-md bg-black/50 border border-white/10 px-3 py-2 font-mono text-sm">
                <span className="text-zinc-500">Type:</span> <span className="text-white">CNAME</span>
                <span className="text-zinc-700 mx-1">|</span>
                <span className="text-zinc-500">Name:</span> <span className="text-white">www</span>
                <span className="text-zinc-700 mx-1">|</span>
                <span className="text-zinc-500">Target:</span> <span className="text-primary">cname.vercel-dns.com</span>
                <CopyButton text="cname.vercel-dns.com" />
              </div>
            </Step>

            <Step number={6} title="Add Domain in Vercel">
              Since the site is deployed via Orchids (which uses Vercel), you need an Orchids PRO plan to add a custom domain through their dashboard. Alternatively, if you deploy directly to Vercel, you can add the domain in{" "}
              <strong className="text-white">Project Settings &rarr; Domains</strong>.
            </Step>

            <Step number={7} title="Wait for Propagation">
              DNS changes can take <strong className="text-white">5 minutes to 48 hours</strong> to propagate globally. Once verified, SSL is auto-provisioned.
            </Step>
          </div>

          {/* Domain checker */}
          <div className="border-t border-white/5 pt-6">
            <h3 className="text-sm font-semibold mb-3">Quick Domain Check</h3>
            <div className="flex gap-2">
              <Input
                placeholder="Enter your domain (e.g. studyverse.online)"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="bg-black/50 border-white/10"
              />
              <a
                href={customDomain ? `https://dnschecker.org/#A/${customDomain.replace(/^https?:\/\//, '')}` : "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!customDomain) {
                    e.preventDefault()
                    toast.error("Enter a domain name first")
                  }
                }}
              >
                <Button variant="secondary" className="shrink-0 gap-2">
                  Check DNS <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </a>
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Opens dnschecker.org to verify if your DNS records have propagated globally.
            </p>
          </div>

          {/* Important notes */}
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Important Notes
            </h4>
            <ul className="space-y-1.5 text-xs text-zinc-400">
              <li>- Your current CNAME record for <code className="text-amber-300">www</code> points to <code className="text-amber-300">studyverse.online</code>. Update it to <code className="text-primary">cname.vercel-dns.com</code> to connect with Vercel.</li>
              <li>- Delete any existing CAA records that conflict with Let&apos;s Encrypt SSL provisioning, or ensure <code className="text-amber-300">letsencrypt.org</code> is included.</li>
              <li>- Orchids requires a PRO plan for custom domains. For the free route, deploy directly to Vercel and add the domain there.</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
        {number}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <p className="mt-0.5 text-sm text-zinc-400">{children}</p>
      </div>
    </div>
  )
}
