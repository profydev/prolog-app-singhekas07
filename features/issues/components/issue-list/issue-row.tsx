import capitalize from "lodash/capitalize";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { ProjectLanguage } from "@api/projects.types";
import { IssueLevel } from "@api/issues.types";
import type { Issue } from "@api/issues.types";
import styles from "./issue-row.module.scss";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

export function IssueRow({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];

  return (
    <tr className={styles.row}>
      <td className={styles.issueCell}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.languageIcon}
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <div>
          <div className={styles.errorTypeAndMessage}>
            <span className={styles.errorType}>{name}:&nbsp;</span>
            {message}
          </div>
          <div>{firstLineOfStackTrace}</div>
        </div>
      </td>

      <td className={styles.cell}>
        <svg
          width="192"
          height="40"
          viewBox="0 0 192 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_377_25541)">
            <g clip-path="url(#clip1_377_25541)">
              <path
                d="M0 20C0 17.7909 1.79086 16 4 16C6.20914 16 8 17.7909 8 20V40H0V20Z"
                fill="#D6BBFB"
              />
              <path
                d="M14.1538 24C14.1538 21.7909 15.9447 20 18.1538 20C20.363 20 22.1538 21.7909 22.1538 24V40H14.1538V24Z"
                fill="#D6BBFB"
              />
              <path
                d="M28.3077 20C28.3077 17.7909 30.0986 16 32.3077 16C34.5168 16 36.3077 17.7909 36.3077 20V40H28.3077V20Z"
                fill="#D6BBFB"
              />
              <path
                d="M42.4615 11C42.4615 8.79086 44.2524 7 46.4615 7C48.6707 7 50.4615 8.79086 50.4615 11V40H42.4615V11Z"
                fill="#D6BBFB"
              />
              <path
                d="M56.6154 28C56.6154 25.7909 58.4062 24 60.6154 24C62.8245 24 64.6154 25.7909 64.6154 28V40H56.6154V28Z"
                fill="#D6BBFB"
              />
              <path
                d="M70.7692 25C70.7692 22.7909 72.5601 21 74.7692 21C76.9784 21 78.7692 22.7909 78.7692 25V40H70.7692V25Z"
                fill="#D6BBFB"
              />
              <path
                d="M84.9231 20C84.9231 17.7909 86.714 16 88.9231 16C91.1322 16 92.9231 17.7909 92.9231 20V40H84.9231V20Z"
                fill="#D6BBFB"
              />
              <path
                d="M99.0769 27C99.0769 24.7909 100.868 23 103.077 23C105.286 23 107.077 24.7909 107.077 27V40H99.0769V27Z"
                fill="#D6BBFB"
              />
              <path
                d="M113.231 28C113.231 25.7909 115.022 24 117.231 24C119.44 24 121.231 25.7909 121.231 28V40H113.231V28Z"
                fill="#D6BBFB"
              />
              <path
                d="M127.385 36C127.385 33.7909 129.175 32 131.385 32C133.594 32 135.385 33.7909 135.385 36V40H127.385V36Z"
                fill="#D6BBFB"
              />
              <path
                d="M141.538 18C141.538 15.7909 143.329 14 145.538 14C147.748 14 149.538 15.7909 149.538 18V40H141.538V18Z"
                fill="#D6BBFB"
              />
              <path
                d="M155.692 24C155.692 21.7909 157.483 20 159.692 20C161.901 20 163.692 21.7909 163.692 24V40H155.692V24Z"
                fill="#D6BBFB"
              />
              <path
                d="M169.846 15C169.846 12.7909 171.637 11 173.846 11C176.055 11 177.846 12.7909 177.846 15V40H169.846V15Z"
                fill="#D6BBFB"
              />
              <path
                d="M184 28C184 25.7909 185.791 24 188 24C190.209 24 192 25.7909 192 28V40H184V28Z"
                fill="#D6BBFB"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_377_25541">
              <rect width="192" height="40" fill="white" />
            </clipPath>
            <clipPath id="clip1_377_25541">
              <rect width="192" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </td>

      <td className={styles.cell}>
        <Badge color={levelColors[level]} size={BadgeSize.sm}>
          {capitalize(level)}
        </Badge>
      </td>
      <td className={styles.cell}>{numEvents}</td>
      <td className={styles.cell}>{numUsers}</td>
    </tr>
  );
}
