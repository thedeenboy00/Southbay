import type { Agent } from "@/types/property";
import type { EnquiryType } from "@/lib/enquiry";
import { EnquiryLink } from "@/components/enquiry/enquiry-link";

interface AgentPanelProps {
  agent: Agent;
  actionType: EnquiryType;
}

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter((part) => part !== "")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/** Shows only name and role. The demo contact details are not displayed, as no real channel exists. */
export function AgentPanel({ agent, actionType }: AgentPanelProps) {
  return (
    <aside aria-labelledby="agent-heading" className="rounded-card border border-line bg-surface p-5 sm:p-6">
      <h2 id="agent-heading" className="eyebrow">
        Listing agent
      </h2>
      <div className="mt-4 flex items-center gap-4">
        <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
          {initials(agent.name)}
        </span>
        <div>
          <p className="font-semibold text-ink">{agent.name}</p>
          <p className="text-sm text-muted">{agent.role}</p>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted">Fictional demo agent.</p>
      <EnquiryLink type={actionType} variant="secondary" className="mt-5 w-full">
        Ask about this property
      </EnquiryLink>
    </aside>
  );
}
