---
title: git常用命令
---

### 工作区、暂存区、版本库

第一步是用 git add 把文件添加进去，实际上就是把文件修改添加到暂存区;
第二步是用 git commit 提交更改，实际上就是把暂存区的所有内容提交到当前分支;

### 清除工作区的改动

    git checkout .

### 清除工作区、暂存区的改动

    git checkout HEAD .

### 暂存区退回工作区

    git rm --cached <file>
    git rm --cached microApps/channel/src/pages/newUsersLandingPage/d

### 删除本地分支

    git branch -d xxx

### 删除本地分支

    git push origin -d xxx

### 同步分支列表(精简) - 不会出现被删除的分支

    git fetch -p

### 查找字符串(当前项目内查找)

    git grep ""

### 操作远程

    git remote (列出你指定的每一个远程服务器的简写)
    git remote -v 指定选项 -v，会显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL
    git remote add <shortname> <url> 添加一个新的远程 Git 仓库 -- 可使用字符串 <shortname> 来代替整个 URL。 例如，如果你想拉取 Paul 的仓库中有但你没有的信息，可以运行 git fetch <shortname>

    git remote xs

### 克隆一个仓库

    git clone 如果你使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所以，git fetch origin 会抓取克隆（或上一次抓取）后新推送的所有工作。 必须注意 git fetch 命令只会将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。

### 从远程仓库抓取与拉取

    git fetch <remote>

### 推送到远程仓库

    git push <remote> <branch>
    git push origin master 将 master 分支推送到 origin 服务器时（再次说明，克隆时通常会自动帮你设置好那两个名字）， 那么运行这个命令就可以将你所做的备份到服务器

### 查看某个远程仓库

    git remote show <remote>

### 远程仓库的重命名与移除

    git remote rename <oldRemote> <newRemote> 运行 git remote rename 来修改一个远程仓库的简写名
    git remote remove <remote>

### 设置 git commit 模版

    git commit 会带出vim界面填写最终的结果
    通过修改 ~/.gitconfig 添加
    ```
        [commit]
        template = ~/.gitmessage (文件名)
        新建的 ~/.gitmessage 内容
        # head: <type>(<scope>): <subject>
        # - type: feat, fix, docs, style, refactor, test, chore
        # - scope: can be empty (eg. if the change is a global or difficult to assign to a single component)
        # - subject: start with verb (such as 'change'), 50-character line
        #
        # body: 72-character wrapped. This should answer:
        # * Why was this change necessary?
        # * How does it address the problem?
        # * Are there any side effects?
        #
        # footer:
        # - Include a link to the ticket, if any.
        # - BREAKING CHANGE
        #
    ```

### 相关包

- commitizen
- cz-conventional-changelog
- cz-customizable

### git 提交规范

- Git Commit Message

- http://404player.cn/2020/11/07/Powershell%E4%B9%8B%E6%8A%98%E8%85%BE%E7%AC%94%E8%AE%B0/
- https://jishuin.proginn.com/p/763bfbd67870
- https://www.bilibili.com/video/BV1Vi4y1u7ea/
