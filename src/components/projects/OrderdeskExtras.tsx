import { ArrowUpRight } from 'lucide-react'
import { defects, orderdesk, otherTesting, qaSkills } from '../../data/qa'
import { Tag, textLink } from '../ui/primitives'

const subhead = 'font-serif text-xl font-medium text-fg'

/** Extra case-study blocks for Orderdesk: the bug table, testing elsewhere and testing skills. */
export function OrderdeskExtras() {
  return (
    <>
      <section>
        <h4 className={subhead}>The 8 planted bugs, and what caught each one</h4>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">
          Each bug can be switched on by itself. The suite runs once per bug, and CI fails if any of them slips through.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[34rem] border-collapse text-left text-[15px]">
            <thead className="bg-sunken text-sm text-fg-muted">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">Bug</th>
                <th scope="col" className="px-4 py-3 font-medium">What was wrong</th>
                <th scope="col" className="px-4 py-3 font-medium">Caught by</th>
              </tr>
            </thead>
            <tbody>
              {defects.map((d) => (
                <tr key={d.id} className="border-t border-line">
                  <th scope="row" className="px-4 py-3 font-mono text-sm font-normal whitespace-nowrap">
                    <a href={`${orderdesk.links.github}/blob/main/docs/bugs/${d.id}.md`} target="_blank" rel="noreferrer" className={textLink}>
                      {d.id}
                    </a>
                  </th>
                  <td className="px-4 py-3 text-fg">{d.what}</td>
                  <td className="px-4 py-3 text-fg-muted">{d.caughtBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h4 className={subhead}>Testing in my other work</h4>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          {otherTesting.map((item) => (
            <div key={item.name}>
              <h5 className="text-[15px] font-semibold text-fg">
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noreferrer" className="inline-flex items-start gap-1 hover:text-accent">
                    {item.name}
                    <ArrowUpRight className="mt-1 size-3.5 shrink-0" aria-hidden="true" />
                  </a>
                ) : (
                  item.name
                )}
              </h5>
              <ul className="mt-2 space-y-2">
                {item.points.map((p) => (
                  <li key={p} className="text-sm leading-relaxed text-fg-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className={subhead}>Testing skills</h4>
        <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
          {qaSkills.map((g) => (
            <div key={g.title}>
              <dt className="text-[15px] font-semibold text-fg">
                {g.title} <span className="font-normal text-fg-subtle">· {g.plain}</span>
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  )
}
